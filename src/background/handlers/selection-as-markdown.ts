import { plainText } from './utils.js'
import { createTabClient } from '@delight-rpc/webextension'
import { IFrameAPI } from '@src/contract.js'
import { CommandHandler } from './types.js'
import { getConfig } from '@background/storage.js'
import { pipeAsync } from 'extra-utils'
import { offscreen } from '@background/offscreen-client.js'
import { assert, isntNull } from '@blackglory/prelude'

export const commandSelectionAsMarkdown: CommandHandler = async (info, tab) => {
  if (tab.id) {
    const baseURL = info.frameUrl ?? info.pageUrl ?? tab.url

    if (baseURL) {
      const config = await getConfig()
      const client = createTabClient<IFrameAPI>({
        tabId: tab.id
      , frameId: info.frameId
      })

      const html = await client.getSelectionHTML()
      assert(isntNull(html))

      return plainText(
        await pipeAsync(
          html
        , offscreen.sanitizeHTML
        , html => offscreen.formatURLsInHTML(html, baseURL, config.url)
        , html => offscreen.convertHTMLToMarkdown(html, config.markdown)
        )
      )
    }
  }
}
