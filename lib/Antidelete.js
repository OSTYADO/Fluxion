const fs = require('fs');
const path = require('path');

const baseDir = 'message_data';

// Ensure base directory exists
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

function loadChatData(remoteJid, messageId) {
  try {
    const chatDir = path.join(baseDir, remoteJid.replace(/[:@]/g, '_'));
    const chatFilePath = path.join(chatDir, `${messageId}.json`);
    
    if (!fs.existsSync(chatFilePath)) return [];
    
    const data = fs.readFileSync(chatFilePath, 'utf8');
    return JSON.parse(data) || [];
  } catch (error) {
    return [];
  }
}

function saveChatData(remoteJid, messageId, chatData) {
  try {
    const safeJid = remoteJid.replace(/[:@]/g, '_');
    const chatDir = path.join(baseDir, safeJid);
    
    if (!fs.existsSync(chatDir)) {
      fs.mkdirSync(chatDir, { recursive: true });
    }
    
    const chatFilePath = path.join(chatDir, `${messageId}.json`);
    
    // Keep only last 20 messages
    while (chatData.length > 20) {
      chatData.shift();
    }
    
    fs.writeFileSync(chatFilePath, JSON.stringify(chatData, null, 2));
  } catch (error) {
    console.error('Error saving chat data:', error);
  }
}

function handleIncomingMessage(message) {
  try {
    if (!message?.key?.remoteJid || !message?.key?.id) return;
    
    const remoteJid = message.key.remoteJid;
    const messageId = message.key.id;
    
    const chatData = loadChatData(remoteJid, messageId);
    chatData.push(message);
    saveChatData(remoteJid, messageId, chatData);
  } catch (error) {
    console.error('Error handling incoming message:', error);
  }
}

async function handleMessageRevocation(client, revocationMessage) {
  try {
    if (!revocationMessage?.message?.protocolMessage?.key) return;
    
    const remoteJid = revocationMessage.key.remoteJid;
    const messageId = revocationMessage.message.protocolMessage.key.id;
    
    const chatData = loadChatData(remoteJid, messageId);
    if (chatData.length === 0) return;
    
    const originalMessage = chatData[0];
    if (!originalMessage) return;
    
    const deletedBy = revocationMessage.participant || revocationMessage.key.participant || revocationMessage.key.remoteJid;
    const sentBy = originalMessage.key.participant || originalMessage.key.remoteJid;
    
   
    if (deletedBy.includes(client.user.id) || sentBy.includes(client.user.id)) return;
    
    const deletedByFormatted = `@${deletedBy.split('@')[0]}`;
    const sentByFormatted = `@${sentBy.split('@')[0]}`;
    
    let notificationText = `\n\n◉ 𝕱𝖑𝖚𝖝𝖎𝖔𝖓 𝖆𝖓𝖙𝖎𝖉𝖾𝖑𝖊𝖙𝖊 😈\n◉ 𝙳𝚎𝚕𝚎𝚝𝚎𝚍 𝙱𝚢 : ${deletedByFormatted}\n◉ 𝚂𝚎𝚗𝚝 𝚋𝚢 : ${sentByFormatted}`;
    
   
    if (originalMessage.message?.conversation) {
      const messageText = originalMessage.message.conversation;
      notificationText += `\n\n◉ 𝗠𝗲𝘀𝘀𝗮𝗴𝗲: ${messageText}`;
      await client.sendMessage(client.user.id, { text: notificationText });
    }
    // Handle extended text messages
    else if (originalMessage.message?.extendedTextMessage?.text) {
      const messageText = originalMessage.message.extendedTextMessage.text;
      notificationText += `\n\n◉ 𝕯𝖊𝖑𝖊𝖙𝖊𝖉 𝕸𝖊𝖘𝖘𝖆𝖌𝖊: ${messageText}`;
      await client.sendMessage(client.user.id, { text: notificationText });
    }
    // Handle media messages
    else if (originalMessage.message?.imageMessage || 
             originalMessage.message?.videoMessage || 
             originalMessage.message?.documentMessage || 
             originalMessage.message?.audioMessage || 
             originalMessage.message?.stickerMessage) {
      
      try {
        // Download the media
        const mBuffer = await client.downloadAndSaveMediaMessage(originalMessage);
        if (!mBuffer) return;
        
        // Determine media type
        let mediaType = '';
        let caption = '';
        
        if (originalMessage.message.imageMessage) {
          mediaType = 'image';
          caption = originalMessage.message.imageMessage.caption || '';
        } else if (originalMessage.message.videoMessage) {
          mediaType = 'video';
          caption = originalMessage.message.videoMessage.caption || '';
        } else if (originalMessage.message.documentMessage) {
          mediaType = 'document';
          caption = originalMessage.message.documentMessage.fileName || '';
        } else if (originalMessage.message.audioMessage) {
          mediaType = originalMessage.message.audioMessage.ptt ? 'voice' : 'audio';
        } else if (originalMessage.message.stickerMessage) {
          mediaType = 'sticker';
        }
        
        // Add caption to notification if exists
        if (caption) {
          notificationText += `\n\n◉ 𝗖𝗮𝗽𝘁𝗶𝗼𝗻: ${caption}`;
        }
        
        notificationText += `\n\n◉ 𝗠𝗲𝗱𝗶𝗮 𝗧𝘆𝗽𝗲: ${mediaType}`;
        
        // Send notification first
        await client.sendMessage(client.user.id, { text: notificationText });
        
        // Then resend the media
        const mediaOptions = {};
        
        if (mediaType === 'image') {
          mediaOptions.image = fs.readFileSync(mBuffer);
          if (caption) mediaOptions.caption = `⚠️ Deleted Image\n${caption}`;
        } else if (mediaType === 'video') {
          mediaOptions.video = fs.readFileSync(mBuffer);
          if (caption) mediaOptions.caption = `⚠️ Deleted Video\n${caption}`;
        } else if (mediaType === 'document') {
          mediaOptions.document = fs.readFileSync(mBuffer);
          mediaOptions.fileName = originalMessage.message.documentMessage.fileName || 'deleted_file';
          mediaOptions.mimetype = originalMessage.message.documentMessage.mimetype;
        } else if (mediaType === 'audio' || mediaType === 'voice') {
          mediaOptions.audio = fs.readFileSync(mBuffer);
          mediaOptions.ptt = mediaType === 'voice';
          mediaOptions.mimetype = originalMessage.message.audioMessage.mimetype;
        } else if (mediaType === 'sticker') {
          mediaOptions.sticker = fs.readFileSync(mBuffer);
        }
        
        await client.sendMessage(remoteJid, mediaOptions);
        
        // Clean up temp file
        fs.unlinkSync(mBuffer);
        
      } catch (mediaError) {
        console.error('Error processing media:', mediaError);
        notificationText += `\n\n◉ 𝗠𝗲𝗱𝗶𝗮 𝗰𝗼𝘂𝗹𝗱 𝗻𝗼𝘁 𝗯𝗲 𝗿𝗲𝗰𝗼𝘃𝗲𝗿𝗲𝗱`;
        await client.sendMessage(client.user.id, { text: notificationText });
      }
    }
    
  } catch (error) {
    console.error('Error handling message revocation:', error);
  }
}

module.exports = {
  handleIncomingMessage,
  handleMessageRevocation,
  saveChatData,
  loadChatData
};