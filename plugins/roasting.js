const fetch = require('node-fetch');

const handler = async (m, {res, client, text, prefix, command}) => {
  const orang = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

  if (!orang) {
    return res(`𝚃𝚊𝚐 𝙰 𝚞𝚜𝚎𝚛 𝚘𝚛 𝚄𝚜𝚎 ${prefix + command} 𝟸𝟻𝟺𝚡𝚡`);
  }

  let ppthumb;
  try {
    ppthumb = await client.profilePictureUrl(orang, 'image');
  } catch {
    ppthumb = 'https://telegra.ph/file/3e1f0d2993d09ea4a5fc2.jpg'; 
  }

  const roastList = [
  `@user You're so slow, even your shadow gave up on you during PE`,
  `@user Even Google couldn't find your intelligence.`,
  `@user You're like a cloud. When you disappear, it's a beautiful day.`,
  `@user You're the reason shampoo has instructions.`,
  `@user You're not stupid you just have bad luck thinking.`,
  `@user You bring everyone so much joy… when you leave the room.`,
  `@user Your secrets are always safe with me. I never even listen when you talk.`,
 `@user You're not the dumbest person alive, but you better hope they don’t die.`,
 `@user You're proof that evolution can go in reverse.`,
 `@user You're like a broken pencil — pointless.`,
 `@user You bring everyone together… in mutual disappointment.`,
 `@user You're the human version of a typo.`,
 `@user Your WiFi signal has more connection than you do with reality.`,
 `@user You have the energy of a dead phone at 3% pretending it's still useful.`,
`@user You're like WiFi at a public airport — slow, unstable, and nobody wants to rely on you.`,
`@user You're the reason mirrors cringe.`,
`@user You're so dry, even your tears are on strike.`,
`@user You have something on your face… oh never mind, that’s just your face.`,
`@user Your hashtag ‘blessed’ but can’t even bless a sentence with grammar.`,
`@user You post like you're famous — even your shadow doesn't follow you.`,
`@user Your likes are the only thing going up in your life.`,
`@user Your Instagram vs. real life is the biggest plot twist since 'Game of Thrones.`,
`@user Your whole life is a tutorial on how not to exist.`,
`@user You send memes like it’s 2014. Update your humor, dinosaur.`,
`@user You're the human version of 'left on read.`,
`@user You reply once every 3 days like you’re on a spiritual retreat — but you're just lazy.`,
`@user You react to every message but contribute nothing — emoji freelancer vibes.`,
`@user You're proof that effort doesn’t always lead to results.`,
`@user You always bring so much joy… whenever you're not talking.`,
`@user Your brain’s been buffering since birth — still waiting on that first complete thought.`,
`@user You're the reason life has a ‘try again later’ button.`,
`@user Talking to you is like a network error. Constant delays, no substance, and zero connection.`,
`@user You're like a failed message — always showing up at the worst time and never delivering anything useful.`];

  const roastText = roastList[Math.floor(Math.random() * roastList.length)].replace(/@user/g, `@${orang.split('@')[0]}`);

  try {
    await client.sendMessage(m.chat, {
      text: roastText,
      mentions: [orang],
      contextInfo: {
        externalAdReply: {
          title: `𝙵𝚕𝚞𝚡𝚒𝚘𝚗 𝙸𝙸`,
          body: `𝙵𝙴𝙴𝙻 𝚃𝙷𝙴 𝙷𝙴𝙰𝚃`,
          thumbnailUrl: ppthumb,
         
        }
      }
    });
  } catch (error) {
    console.error(`Error saat mengirim pesan:`, error);
    m.reply(`You're like a failed message — always showing up at the worst time and never delivering anything useful.`);
  }
};

handler.help = ['roast @user | 254xxxx'];
handler.tags = ['fun'];
handler.command = ['roast', 'diss'];

module.exports = handler;