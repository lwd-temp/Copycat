import { plainText } from './utils.js'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI } from '@src/contract.js'
import { CommandHandler } from './types.js'
import { getConfig } from '@background/storage.js'
import { pipeAsync } from 'extra-utils'
import { offscreen } from '@background/offscreen-client.js'
import { formatHTML } from '@utils/format-html.js'

export const commandSelectionAsHTML: CommandHandler = async (info, tab) => {
  if (tab?.id) {
    const client = createTabClient<IFrameAPI>({
      tabId: tab.id
    , frameId: info.frameId
    })

    const config = await getConfig()
    const html = await client.getSelectionHTML()
    const baseURL = info.frameUrl ?? info.pageUrl ?? tab.url
    if (baseURL) {
      return plainText(
        await pipeAsync(
          html
        , offscreen.sanitizeHTML
        , html => offscreen.formatURLsInHTML(html, baseURL, config.url)
        , formatHTML
        )
      )
    }
  }
}
