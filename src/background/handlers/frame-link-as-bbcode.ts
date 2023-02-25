import { plainText } from './utils.js'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI } from '@src/contract.js'
import { getConfig } from '@background/storage.js'
import { formatURL } from '@utils/format-url.js'
import { createBBCodeLink } from '@utils/create-bbcode-link.js'
import { CommandHandler } from './types.js'

export const commandFrameLinkAsBBCode: CommandHandler = async (info, tab) => {
  if (info.frameUrl) {
    if (tab?.id && tab.url) {
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const config = await getConfig()
      const url = formatURL(info.frameUrl, tab.url, config.url)
      const title = await client.getDocumentTitle()

      return plainText(createBBCodeLink(url, title))
    } else {
      return plainText(createBBCodeLink(info.frameUrl))
    }
  }
}
