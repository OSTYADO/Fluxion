const axios = require("axios");
let handler = async (m,{res,client, text, prefix, reaction}) =>{
				
				await client.sendMessage(m.chat, {
					react: {
						text: "⚡",
						key: m.key
					}
				});
				try {
					let query = m.text.slice(8).trim();
					if (query === "") {
						res("*𝙴𝚡𝚊𝚖𝚙𝚕𝚎:* \n\n*𝙸𝚐 𝚞𝚜𝚎𝚛𝚗𝚊𝚖𝚎*");
					} else {
						let {
							data
						} = await axios.get(`https://skizo.tech/api/igstalk?apikey=LimmvzXgembul&user=${encodeURIComponent(query)}`);

						if (data.status === true && data.result) {
							let profileInfo = `${gris}[ 𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢]${gris}\n\n*𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎 : ${data.result.username}*\n*𝙵𝚞𝚕𝚕𝚗𝚊𝚖𝚎 : ${data.result.fullName}*\n*𝙱𝚒𝚘 : ${data.result.bio}*\n*𝙵𝚘𝚕𝚕𝚘𝚠𝚎𝚛𝚜 : ${data.result.followers}*\n*𝙵𝚘𝚕𝚕𝚘𝚠𝚒𝚗𝚐: ${data.result.following}*\n*𝙿𝚘𝚜𝚝𝚜: ${data.result.postsCount}*`;
							await client.sendMessage(m.chat, {
								image: {
									url: data.result.photoUrl
								},
								caption: profileInfo
							}, {
								quoted: st
							});
						} else {
							res("𝙴𝚛𝚛𝚘𝚛 𝚍𝚞𝚛𝚒𝚗𝚐 𝚍𝚊𝚝𝚊 𝚛𝚎𝚝𝚛𝚒𝚎𝚟𝚊𝚕 ");
						}
					}
				} catch (error) {
					res(error);
				}
		};
handler.help = ["igstalk"];
handler.tags = ["stalk"];
handler.command = ["igstalk"];
module.exports = handler;