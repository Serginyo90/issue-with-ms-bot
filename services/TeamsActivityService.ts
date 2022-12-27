import {
  ConversationState,
  TeamsActivityHandler,
  TurnContext,
} from 'botbuilder'

export default class TeamsActivityService extends TeamsActivityHandler {
  conversationState: ConversationState
  constructor(conversationState: ConversationState) {
    super()
    this.conversationState = conversationState

    this.onConversationUpdate(async (context: TurnContext, next) => {
      console.log({ message: '__onConversationUpdate_context__', data: JSON.stringify(context.activity) })
      await next()
    })

    this.onMembersAdded(async (context: TurnContext, next) => {
      console.log({ message: '__onMembersAdded_context__', data: JSON.stringify(context) })
      console.log({ message: '__onMembersAdded_activity__', data: JSON.stringify(context.activity) })
      await next()
    })

    this.onMessage(async (context: TurnContext, next) => {
      console.log({ message: '__onMessage_context__' })
      await next()
    })
  }

  /**
   * Override the ActivityHandler.run() method to save state changes after the bot logic completes.
   */
  async run(context: TurnContext, hashId?: string) {
    await super.run(context)
    // Save any state changes. The load happened during the execution of the Dialog.
    await this.conversationState.saveChanges(context, false)
  }
}
