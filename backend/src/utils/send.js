import axios from "axios";
const url = "https://api.wassenger.com/v1/messages";
const Token =
  "a292ef151f92a95cf763218ba697ee5e2598e9542796e5ce4e6949119aeae634c6289c63404decb7";

const whatsAppGroups = {
  main: "120363403408224343@g.us",
  demo: "120363402944849025@g.us",
  admins: "120363421157528136@g.us",
};

export async function sendCourseMessage(adminName, messages, waGroup) {
  const message = generateWhatsAppMessage({
    trainerName: adminName,
    changes: messages,
  });

  const options = {
    method: "POST",
    url,
    headers: {
      "Content-Type": "application/json",
      Token,
    },
    data: {
      group: whatsAppGroups[waGroup],
      message,
    },
  };

  try {
    const { data } = await axios.request(options);
  } catch (error) {
    console.error(error);
  }
}

function generateWhatsAppMessage({ trainerName, changes = [], variant = 1 }) {
  const formattedChanges = changes.map((c) => `➡ ${c}`).join("\n\n");

  const variants = {
    1: `
📢 *${trainerName}* hat den Kursplan aktualisiert!

${formattedChanges}
    
📌 Kursplan: https://next-rep.app
`.trim(),
  };

  return variants[variant] || variants[1];
}
