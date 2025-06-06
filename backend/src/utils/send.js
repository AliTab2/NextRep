import axios from "axios"
const url = 'https://api.wassenger.com/v1/messages'
const Token = 'a292ef151f92a95cf763218ba697ee5e2598e9542796e5ce4e6949119aeae634c6289c63404decb7'
const group = '120363403408224343@g.us'

export async function sendCourseMessage(adminName, msg) {
  
  const message = 
        `🚨 *${adminName}* hat eine Änderung vorgenommen!\n\n` +
        `🗓 _*Änderung*: ${msg}_\n\n` +
        `👉 Schaut mal rein: https://www.next-rep.app`

  const options = {
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
      Token,
    },
    data: {
      group,
      message,
    },
  }

  try {
    const { data } = await axios.request(options)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
