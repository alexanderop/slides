import { defineMermaidSetup } from '@slidev/types'

export default defineMermaidSetup(() => {
  return {
    theme: 'dark',
    themeVariables: {
      // Common settings
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      fontSize: '16px',
      mainBkg: 'transparent',
      labelBackground: 'transparent',
      textAlignment: 'center',

      // Border and arrow settings
      nodeBorder: 'rgb(171, 75, 153)',
      nodeTextColor: 'rgb(234, 237, 243)',
      clusterBkg: '#1e2430',
      clusterBorder: 'rgb(171, 75, 153)',
      lineColor: 'rgb(255, 107, 237)',
      lineWidth: '2px',
      arrowheadColor: 'rgb(255, 107, 237)',

      // Colors
      primaryColor: 'rgb(255, 107, 237)', // dark accent
      primaryTextColor: 'rgb(234, 237, 243)', // dark text-base
      primaryBorderColor: 'rgb(171, 75, 153)', // dark border
      secondaryColor: 'rgb(52, 63, 96)', // dark card
      tertiaryColor: 'rgb(138, 51, 123)', // dark card-muted
    },
    sequence: {
      actorFontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      noteFontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      messageFontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      actorFontSize: 16,
      noteFontSize: 16,
      messageFontSize: 16,
      wrap: true,
      useMaxWidth: false,
      boxMargin: 10,
      boxTextMargin: 5,
      noteMargin: 10,
      messageMargin: 35,
      arrowMarkerAbsolute: true,
    },
    flowchart: {
      curve: 'basis',
      htmlLabels: true,
      arrowMarkerAbsolute: true,
      nodeSpacing: 50,
      rankSpacing: 50,
      padding: 15,
    },
    htmlLabels: true,
    useMaxWidth: false,
  }
}) 