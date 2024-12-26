import { html } from 'satori-html'
import backgroundBase64 from './base64'
import type { BgType } from '../../src/types'

export const ogImageMarkup = (
  authorOrBrand: string,
  title: string,
  bgType: BgType
) => {
  if (!['plum', 'dot', 'rose', 'particle'].includes(bgType))
    throw new Error(
      "The value of 'bgType' must be one of the following: 'plum', 'dot', 'rose', 'particle'."
    )

  return html`<div
    tw="relative flex justify-center items-center w-full h-full"
    style="font-family: 'Inter'"
  >
    <img
      tw="absolute inset-0 w-full h-full"
      src=${backgroundBase64[bgType]}
      alt="open graph"
    />

    <div tw="flex items-center justify-start w-full px-18" style="gap: 20px">
      <div tw="self-start flex justify-center items-center">
        <svg
          viewBox="0 0 176 215" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g
            stroke="#fdfdfd"
          >
            <path
              stroke-width="7" stroke-linecap="round" stroke-linejoin="round"
              d="M63.7025 14C63.7025 14 63.7024 80 83.7024 73C103.702 66 114.703 14 114.703 14V141.5C114.703 141.5 114.702 188.5 83.7024 197.5C52.7023 206.5 26.5 174.651 43 161.5C59.5 148.349 63.7025 147.5 142.5 119"
            >
            </path>
          </g>
        </svg>
      </div>

      <div tw="flex flex-col" style="gap: 10px">
        <div tw="text-[#858585] text-2.1rem">${authorOrBrand}</div>
        <div tw="text-white text-3.1rem leading-relaxed mr-18">${title}</div>
      </div>
    </div>
  </div>`
}
