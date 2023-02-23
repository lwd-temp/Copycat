import { URLFormat, URLEncoding, IConfigStore } from '@src/contract.js'
import { i18n } from '@utils/i18n.js'
import { Select } from '@components/select.jsx'
import { Updater } from 'use-immer'

interface IURLOptionsProps {
  config: IConfigStore
  setConfig: Updater<IConfigStore>
}

export function URLOptions({ config, setConfig }: IURLOptionsProps) {
  return (
    <div>
      <section>
        <label>{i18n('Options_UrlFormat')}</label>

        <Select
          value={config.url.format}
          items={[
            { name: i18n('Options_AbsoluteURL'), value: URLFormat.Absolute }
          , { name: i18n('Options_RelativeURL'), value: URLFormat.Relative }
          , { name: i18n('Options_RootRelativeURL'), value: URLFormat.RootRelative }
          , { name: i18n('Options_OriginalURL'), value: URLFormat.Original }
          ]}
          onChange={value => setConfig(config => {
            config.url.format = value
          })}
        />
      </section>

      <section>
        <label>URL Encoding</label>
        <Select
          value={config.url.encoding}
          items={[
            { name: 'Original', value: URLEncoding.Original }
          , { name: 'Always Encode', value: URLEncoding.AlwaysEncode }
          , { name: 'Always Decode', value: URLEncoding.AlwaysDecode }
          ]}
          onChange={value => setConfig(config => {
            config.url.encoding = value
          })}
        />
      </section>
    </div>
  )
}