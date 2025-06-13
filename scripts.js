const proxy = "https://corsproxy.io/?";
const targetURL = "https://www.ifixit.com/api/2.0/users/4502323";

fetch(proxy + encodeURIComponent(targetURL))
  .then(response => {
    if (!response.ok) throw new Error("Antwort war nicht OK.");
    return response.json();
  })
  .then(data => {
    const output = `
      <p><strong>Benutzername:</strong> ${data.username}</p>
      <p><strong>Reputation:</strong> ${data.reputation}</p>
      <p><strong>Beigetreten am:</strong> ${new Date(data.join_date * 1000).toLocaleDateString("de-DE")}</p>
      <p><strong>Badges:</strong> 🥉 ${data.badge_counts.bronze} | 🥈 ${data.badge_counts.silver} | 🥇 ${data.badge_counts.gold}</p>
      <p><strong>Link zum Profil:</strong> <a href="https://www.ifixit.com/User/${data.userid}" target="_blank">Hier klicken</a></p>
    `;
    document.getElementById("output").innerHTML = output;
  })
  .catch(error => {
    document.getElementById("output").textContent = "Fehler beim Laden von Daten: " + error.message;
    console.error(error);
  });