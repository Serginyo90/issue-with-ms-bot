import express from 'express'

import { BotFrameworkAdapter, ConversationState, MemoryStorage } from 'botbuilder'

// Bot main dialog.
import TeamsActivityService from './services/TeamsActivityService'

const adapter = new BotFrameworkAdapter({
  appId: process.env.BOT_ID,
  appPassword: process.env.BOT_PASSWORD,
})

const memoryStorage = new MemoryStorage()
const conversationState = new ConversationState(memoryStorage)

// Create the bot that will handle incoming messages.
const bot = new TeamsActivityService(conversationState)

// Create HTTP server.

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.port || process.env.PORT || 3978

// Listen for incoming requests.
app.post('/api/messages', async (req, res) => {
  await adapter.processActivity(req, res, async context => {
    try {
      console.log({ message: '__req.body__', data: req.body })
      await bot.run(context)
    } catch (e) {
      console.log({ message: '__ERROR_/api/messages__', data: e })
    }
  })
})

// Listen for incoming notifications and send proactive messages to users.
app.post('/api/notify', async (req, res) => {
  return await handleBot(req, res)
})

app.get('/', async (req: Request, res) => {
  res.send('Running on AWS App Runner Service !')
})

app.listen(port, () => {
  console.log(`Listening to ${port}`)
})

const handleBot = async (
  req,
  res,
) => {
  return res.end()
}
