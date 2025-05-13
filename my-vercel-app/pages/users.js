
import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Kullanıcı ID'si gerekli." });
  }

  try {
    const { data } = await axios.get(`https://www.roblox.com/users/${userId}/profile`);
    const $ = cheerio.load(data);
    const joinDate = $('div.profile-statistics-item span.profile-statistics-value')
      .eq(0)
      .text()
      .trim();

    return res.status(200).json({ joinDate });
  } catch (error) {
    console.error('Hata:', error);
    return res.status(500).json({ error: "Bir hata oluştu." });
  }
}
