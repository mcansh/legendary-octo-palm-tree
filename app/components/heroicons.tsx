import iconsHref from "~/icons/heroicons.svg";

export type SpriteName =
  | "solid:20:academic-cap"
  | "solid:20:adjustments-horizontal"
  | "solid:20:adjustments-vertical"
  | "solid:20:archive-box-arrow-down"
  | "solid:20:archive-box-x-mark"
  | "solid:20:archive-box"
  | "solid:20:arrow-down-circle"
  | "solid:20:arrow-down-left"
  | "solid:20:arrow-down-on-square-stack"
  | "solid:20:arrow-down-on-square"
  | "solid:20:arrow-down-right"
  | "solid:20:arrow-down-tray"
  | "solid:20:arrow-down"
  | "solid:20:arrow-left-circle"
  | "solid:20:arrow-left-on-rectangle"
  | "solid:20:arrow-left"
  | "solid:20:arrow-long-down"
  | "solid:20:arrow-long-left"
  | "solid:20:arrow-long-right"
  | "solid:20:arrow-long-up"
  | "solid:20:arrow-path-rounded-square"
  | "solid:20:arrow-path"
  | "solid:20:arrow-right-circle"
  | "solid:20:arrow-right-on-rectangle"
  | "solid:20:arrow-right"
  | "solid:20:arrow-small-down"
  | "solid:20:arrow-small-left"
  | "solid:20:arrow-small-right"
  | "solid:20:arrow-small-up"
  | "solid:20:arrow-top-right-on-square"
  | "solid:20:arrow-trending-down"
  | "solid:20:arrow-trending-up"
  | "solid:20:arrow-up-circle"
  | "solid:20:arrow-up-left"
  | "solid:20:arrow-up-on-square-stack"
  | "solid:20:arrow-up-on-square"
  | "solid:20:arrow-up-right"
  | "solid:20:arrow-up-tray"
  | "solid:20:arrow-up"
  | "solid:20:arrow-uturn-down"
  | "solid:20:arrow-uturn-left"
  | "solid:20:arrow-uturn-right"
  | "solid:20:arrow-uturn-up"
  | "solid:20:arrows-pointing-in"
  | "solid:20:arrows-pointing-out"
  | "solid:20:arrows-right-left"
  | "solid:20:arrows-up-down"
  | "solid:20:at-symbol"
  | "solid:20:backspace"
  | "solid:20:backward"
  | "solid:20:banknotes"
  | "solid:20:bars-2"
  | "solid:20:bars-3-bottom-left"
  | "solid:20:bars-3-bottom-right"
  | "solid:20:bars-3-center-left"
  | "solid:20:bars-3"
  | "solid:20:bars-4"
  | "solid:20:bars-arrow-down"
  | "solid:20:bars-arrow-up"
  | "solid:20:battery-0"
  | "solid:20:battery-100"
  | "solid:20:battery-50"
  | "solid:20:beaker"
  | "solid:20:bell-alert"
  | "solid:20:bell-slash"
  | "solid:20:bell-snooze"
  | "solid:20:bell"
  | "solid:20:bolt-slash"
  | "solid:20:bolt"
  | "solid:20:book-open"
  | "solid:20:bookmark-slash"
  | "solid:20:bookmark-square"
  | "solid:20:bookmark"
  | "solid:20:briefcase"
  | "solid:20:bug-ant"
  | "solid:20:building-library"
  | "solid:20:building-office-2"
  | "solid:20:building-office"
  | "solid:20:building-storefront"
  | "solid:20:cake"
  | "solid:20:calculator"
  | "solid:20:calendar-days"
  | "solid:20:calendar"
  | "solid:20:camera"
  | "solid:20:chart-bar-square"
  | "solid:20:chart-bar"
  | "solid:20:chart-pie"
  | "solid:20:chat-bubble-bottom-center-text"
  | "solid:20:chat-bubble-bottom-center"
  | "solid:20:chat-bubble-left-ellipsis"
  | "solid:20:chat-bubble-left-right"
  | "solid:20:chat-bubble-left"
  | "solid:20:chat-bubble-oval-left-ellipsis"
  | "solid:20:chat-bubble-oval-left"
  | "solid:20:check-badge"
  | "solid:20:check-circle"
  | "solid:20:check"
  | "solid:20:chevron-double-down"
  | "solid:20:chevron-double-left"
  | "solid:20:chevron-double-right"
  | "solid:20:chevron-double-up"
  | "solid:20:chevron-down"
  | "solid:20:chevron-left"
  | "solid:20:chevron-right"
  | "solid:20:chevron-up-down"
  | "solid:20:chevron-up"
  | "solid:20:circle-stack"
  | "solid:20:clipboard-document-check"
  | "solid:20:clipboard-document-list"
  | "solid:20:clipboard-document"
  | "solid:20:clipboard"
  | "solid:20:clock"
  | "solid:20:cloud-arrow-down"
  | "solid:20:cloud-arrow-up"
  | "solid:20:cloud"
  | "solid:20:code-bracket-square"
  | "solid:20:code-bracket"
  | "solid:20:cog-6-tooth"
  | "solid:20:cog-8-tooth"
  | "solid:20:cog"
  | "solid:20:command-line"
  | "solid:20:computer-desktop"
  | "solid:20:cpu-chip"
  | "solid:20:credit-card"
  | "solid:20:cube-transparent"
  | "solid:20:cube"
  | "solid:20:currency-bangladeshi"
  | "solid:20:currency-dollar"
  | "solid:20:currency-euro"
  | "solid:20:currency-pound"
  | "solid:20:currency-rupee"
  | "solid:20:currency-yen"
  | "solid:20:cursor-arrow-rays"
  | "solid:20:cursor-arrow-ripple"
  | "solid:20:device-phone-mobile"
  | "solid:20:device-tablet"
  | "solid:20:document-arrow-down"
  | "solid:20:document-arrow-up"
  | "solid:20:document-chart-bar"
  | "solid:20:document-check"
  | "solid:20:document-duplicate"
  | "solid:20:document-magnifying-glass"
  | "solid:20:document-minus"
  | "solid:20:document-plus"
  | "solid:20:document-text"
  | "solid:20:document"
  | "solid:20:ellipsis-horizontal-circle"
  | "solid:20:ellipsis-horizontal"
  | "solid:20:ellipsis-vertical"
  | "solid:20:envelope-open"
  | "solid:20:envelope"
  | "solid:20:exclamation-circle"
  | "solid:20:exclamation-triangle"
  | "solid:20:eye-dropper"
  | "solid:20:eye-slash"
  | "solid:20:eye"
  | "solid:20:face-frown"
  | "solid:20:face-smile"
  | "solid:20:film"
  | "solid:20:finger-print"
  | "solid:20:fire"
  | "solid:20:flag"
  | "solid:20:folder-arrow-down"
  | "solid:20:folder-minus"
  | "solid:20:folder-open"
  | "solid:20:folder-plus"
  | "solid:20:folder"
  | "solid:20:forward"
  | "solid:20:funnel"
  | "solid:20:gif"
  | "solid:20:gift-top"
  | "solid:20:gift"
  | "solid:20:globe-alt"
  | "solid:20:globe-americas"
  | "solid:20:globe-asia-australia"
  | "solid:20:globe-europe-africa"
  | "solid:20:hand-raised"
  | "solid:20:hand-thumb-down"
  | "solid:20:hand-thumb-up"
  | "solid:20:hashtag"
  | "solid:20:heart"
  | "solid:20:home-modern"
  | "solid:20:home"
  | "solid:20:identification"
  | "solid:20:inbox-arrow-down"
  | "solid:20:inbox-stack"
  | "solid:20:inbox"
  | "solid:20:information-circle"
  | "solid:20:key"
  | "solid:20:language"
  | "solid:20:lifebuoy"
  | "solid:20:light-bulb"
  | "solid:20:link"
  | "solid:20:list-bullet"
  | "solid:20:lock-closed"
  | "solid:20:lock-open"
  | "solid:20:magnifying-glass-circle"
  | "solid:20:magnifying-glass-minus"
  | "solid:20:magnifying-glass-plus"
  | "solid:20:magnifying-glass"
  | "solid:20:map-pin"
  | "solid:20:map"
  | "solid:20:megaphone"
  | "solid:20:microphone"
  | "solid:20:minus-circle"
  | "solid:20:minus-small"
  | "solid:20:minus"
  | "solid:20:moon"
  | "solid:20:musical-note"
  | "solid:20:newspaper"
  | "solid:20:no-symbol"
  | "solid:20:paint-brush"
  | "solid:20:paper-airplane"
  | "solid:20:paper-clip"
  | "solid:20:pause-circle"
  | "solid:20:pause"
  | "solid:20:pencil-square"
  | "solid:20:pencil"
  | "solid:20:phone-arrow-down-left"
  | "solid:20:phone-arrow-up-right"
  | "solid:20:phone-x-mark"
  | "solid:20:phone"
  | "solid:20:photo"
  | "solid:20:play-circle"
  | "solid:20:play-pause"
  | "solid:20:play"
  | "solid:20:plus-circle"
  | "solid:20:plus-small"
  | "solid:20:plus"
  | "solid:20:power"
  | "solid:20:presentation-chart-bar"
  | "solid:20:presentation-chart-line"
  | "solid:20:printer"
  | "solid:20:puzzle-piece"
  | "solid:20:qr-code"
  | "solid:20:question-mark-circle"
  | "solid:20:queue-list"
  | "solid:20:radio"
  | "solid:20:receipt-percent"
  | "solid:20:receipt-refund"
  | "solid:20:rectangle-group"
  | "solid:20:rectangle-stack"
  | "solid:20:rocket-launch"
  | "solid:20:rss"
  | "solid:20:scale"
  | "solid:20:scissors"
  | "solid:20:server-stack"
  | "solid:20:server"
  | "solid:20:share"
  | "solid:20:shield-check"
  | "solid:20:shield-exclamation"
  | "solid:20:shopping-bag"
  | "solid:20:shopping-cart"
  | "solid:20:signal-slash"
  | "solid:20:signal"
  | "solid:20:sparkles"
  | "solid:20:speaker-wave"
  | "solid:20:speaker-x-mark"
  | "solid:20:square-2-stack"
  | "solid:20:square-3-stack-3d"
  | "solid:20:squares-2x2"
  | "solid:20:squares-plus"
  | "solid:20:star"
  | "solid:20:stop-circle"
  | "solid:20:stop"
  | "solid:20:sun"
  | "solid:20:swatch"
  | "solid:20:table-cells"
  | "solid:20:tag"
  | "solid:20:ticket"
  | "solid:20:trash"
  | "solid:20:trophy"
  | "solid:20:truck"
  | "solid:20:tv"
  | "solid:20:user-circle"
  | "solid:20:user-group"
  | "solid:20:user-minus"
  | "solid:20:user-plus"
  | "solid:20:user"
  | "solid:20:users"
  | "solid:20:variable"
  | "solid:20:video-camera-slash"
  | "solid:20:video-camera"
  | "solid:20:view-columns"
  | "solid:20:viewfinder-circle"
  | "solid:20:wallet"
  | "solid:20:wifi"
  | "solid:20:window"
  | "solid:20:wrench-screwdriver"
  | "solid:20:wrench"
  | "solid:20:x-circle"
  | "solid:20:x-mark"
  | "outline:24:academic-cap"
  | "outline:24:adjustments-horizontal"
  | "outline:24:adjustments-vertical"
  | "outline:24:archive-box-arrow-down"
  | "outline:24:archive-box-x-mark"
  | "outline:24:archive-box"
  | "outline:24:arrow-down-circle"
  | "outline:24:arrow-down-left"
  | "outline:24:arrow-down-on-square-stack"
  | "outline:24:arrow-down-on-square"
  | "outline:24:arrow-down-right"
  | "outline:24:arrow-down-tray"
  | "outline:24:arrow-down"
  | "outline:24:arrow-left-circle"
  | "outline:24:arrow-left-on-rectangle"
  | "outline:24:arrow-left"
  | "outline:24:arrow-long-down"
  | "outline:24:arrow-long-left"
  | "outline:24:arrow-long-right"
  | "outline:24:arrow-long-up"
  | "outline:24:arrow-path-rounded-square"
  | "outline:24:arrow-path"
  | "outline:24:arrow-right-circle"
  | "outline:24:arrow-right-on-rectangle"
  | "outline:24:arrow-right"
  | "outline:24:arrow-small-down"
  | "outline:24:arrow-small-left"
  | "outline:24:arrow-small-right"
  | "outline:24:arrow-small-up"
  | "outline:24:arrow-top-right-on-square"
  | "outline:24:arrow-trending-down"
  | "outline:24:arrow-trending-up"
  | "outline:24:arrow-up-circle"
  | "outline:24:arrow-up-left"
  | "outline:24:arrow-up-on-square-stack"
  | "outline:24:arrow-up-on-square"
  | "outline:24:arrow-up-right"
  | "outline:24:arrow-up-tray"
  | "outline:24:arrow-up"
  | "outline:24:arrow-uturn-down"
  | "outline:24:arrow-uturn-left"
  | "outline:24:arrow-uturn-right"
  | "outline:24:arrow-uturn-up"
  | "outline:24:arrows-pointing-in"
  | "outline:24:arrows-pointing-out"
  | "outline:24:arrows-right-left"
  | "outline:24:arrows-up-down"
  | "outline:24:at-symbol"
  | "outline:24:backspace"
  | "outline:24:backward"
  | "outline:24:banknotes"
  | "outline:24:bars-2"
  | "outline:24:bars-3-bottom-left"
  | "outline:24:bars-3-bottom-right"
  | "outline:24:bars-3-center-left"
  | "outline:24:bars-3"
  | "outline:24:bars-4"
  | "outline:24:bars-arrow-down"
  | "outline:24:bars-arrow-up"
  | "outline:24:battery-0"
  | "outline:24:battery-100"
  | "outline:24:battery-50"
  | "outline:24:beaker"
  | "outline:24:bell-alert"
  | "outline:24:bell-slash"
  | "outline:24:bell-snooze"
  | "outline:24:bell"
  | "outline:24:bolt-slash"
  | "outline:24:bolt"
  | "outline:24:book-open"
  | "outline:24:bookmark-slash"
  | "outline:24:bookmark-square"
  | "outline:24:bookmark"
  | "outline:24:briefcase"
  | "outline:24:bug-ant"
  | "outline:24:building-library"
  | "outline:24:building-office-2"
  | "outline:24:building-office"
  | "outline:24:building-storefront"
  | "outline:24:cake"
  | "outline:24:calculator"
  | "outline:24:calendar-days"
  | "outline:24:calendar"
  | "outline:24:camera"
  | "outline:24:chart-bar-square"
  | "outline:24:chart-bar"
  | "outline:24:chart-pie"
  | "outline:24:chat-bubble-bottom-center-text"
  | "outline:24:chat-bubble-bottom-center"
  | "outline:24:chat-bubble-left-ellipsis"
  | "outline:24:chat-bubble-left-right"
  | "outline:24:chat-bubble-left"
  | "outline:24:chat-bubble-oval-left-ellipsis"
  | "outline:24:chat-bubble-oval-left"
  | "outline:24:check-badge"
  | "outline:24:check-circle"
  | "outline:24:check"
  | "outline:24:chevron-double-down"
  | "outline:24:chevron-double-left"
  | "outline:24:chevron-double-right"
  | "outline:24:chevron-double-up"
  | "outline:24:chevron-down"
  | "outline:24:chevron-left"
  | "outline:24:chevron-right"
  | "outline:24:chevron-up-down"
  | "outline:24:chevron-up"
  | "outline:24:circle-stack"
  | "outline:24:clipboard-document-check"
  | "outline:24:clipboard-document-list"
  | "outline:24:clipboard-document"
  | "outline:24:clipboard"
  | "outline:24:clock"
  | "outline:24:cloud-arrow-down"
  | "outline:24:cloud-arrow-up"
  | "outline:24:cloud"
  | "outline:24:code-bracket-square"
  | "outline:24:code-bracket"
  | "outline:24:cog-6-tooth"
  | "outline:24:cog-8-tooth"
  | "outline:24:cog"
  | "outline:24:command-line"
  | "outline:24:computer-desktop"
  | "outline:24:cpu-chip"
  | "outline:24:credit-card"
  | "outline:24:cube-transparent"
  | "outline:24:cube"
  | "outline:24:currency-bangladeshi"
  | "outline:24:currency-dollar"
  | "outline:24:currency-euro"
  | "outline:24:currency-pound"
  | "outline:24:currency-rupee"
  | "outline:24:currency-yen"
  | "outline:24:cursor-arrow-rays"
  | "outline:24:cursor-arrow-ripple"
  | "outline:24:device-phone-mobile"
  | "outline:24:device-tablet"
  | "outline:24:document-arrow-down"
  | "outline:24:document-arrow-up"
  | "outline:24:document-chart-bar"
  | "outline:24:document-check"
  | "outline:24:document-duplicate"
  | "outline:24:document-magnifying-glass"
  | "outline:24:document-minus"
  | "outline:24:document-plus"
  | "outline:24:document-text"
  | "outline:24:document"
  | "outline:24:ellipsis-horizontal-circle"
  | "outline:24:ellipsis-horizontal"
  | "outline:24:ellipsis-vertical"
  | "outline:24:envelope-open"
  | "outline:24:envelope"
  | "outline:24:exclamation-circle"
  | "outline:24:exclamation-triangle"
  | "outline:24:eye-dropper"
  | "outline:24:eye-slash"
  | "outline:24:eye"
  | "outline:24:face-frown"
  | "outline:24:face-smile"
  | "outline:24:film"
  | "outline:24:finger-print"
  | "outline:24:fire"
  | "outline:24:flag"
  | "outline:24:folder-arrow-down"
  | "outline:24:folder-minus"
  | "outline:24:folder-open"
  | "outline:24:folder-plus"
  | "outline:24:folder"
  | "outline:24:forward"
  | "outline:24:funnel"
  | "outline:24:gif"
  | "outline:24:gift-top"
  | "outline:24:gift"
  | "outline:24:globe-alt"
  | "outline:24:globe-americas"
  | "outline:24:globe-asia-australia"
  | "outline:24:globe-europe-africa"
  | "outline:24:hand-raised"
  | "outline:24:hand-thumb-down"
  | "outline:24:hand-thumb-up"
  | "outline:24:hashtag"
  | "outline:24:heart"
  | "outline:24:home-modern"
  | "outline:24:home"
  | "outline:24:identification"
  | "outline:24:inbox-arrow-down"
  | "outline:24:inbox-stack"
  | "outline:24:inbox"
  | "outline:24:information-circle"
  | "outline:24:key"
  | "outline:24:language"
  | "outline:24:lifebuoy"
  | "outline:24:light-bulb"
  | "outline:24:link"
  | "outline:24:list-bullet"
  | "outline:24:lock-closed"
  | "outline:24:lock-open"
  | "outline:24:magnifying-glass-circle"
  | "outline:24:magnifying-glass-minus"
  | "outline:24:magnifying-glass-plus"
  | "outline:24:magnifying-glass"
  | "outline:24:map-pin"
  | "outline:24:map"
  | "outline:24:megaphone"
  | "outline:24:microphone"
  | "outline:24:minus-circle"
  | "outline:24:minus-small"
  | "outline:24:minus"
  | "outline:24:moon"
  | "outline:24:musical-note"
  | "outline:24:newspaper"
  | "outline:24:no-symbol"
  | "outline:24:paint-brush"
  | "outline:24:paper-airplane"
  | "outline:24:paper-clip"
  | "outline:24:pause-circle"
  | "outline:24:pause"
  | "outline:24:pencil-square"
  | "outline:24:pencil"
  | "outline:24:phone-arrow-down-left"
  | "outline:24:phone-arrow-up-right"
  | "outline:24:phone-x-mark"
  | "outline:24:phone"
  | "outline:24:photo"
  | "outline:24:play-circle"
  | "outline:24:play-pause"
  | "outline:24:play"
  | "outline:24:plus-circle"
  | "outline:24:plus-small"
  | "outline:24:plus"
  | "outline:24:power"
  | "outline:24:presentation-chart-bar"
  | "outline:24:presentation-chart-line"
  | "outline:24:printer"
  | "outline:24:puzzle-piece"
  | "outline:24:qr-code"
  | "outline:24:question-mark-circle"
  | "outline:24:queue-list"
  | "outline:24:radio"
  | "outline:24:receipt-percent"
  | "outline:24:receipt-refund"
  | "outline:24:rectangle-group"
  | "outline:24:rectangle-stack"
  | "outline:24:rocket-launch"
  | "outline:24:rss"
  | "outline:24:scale"
  | "outline:24:scissors"
  | "outline:24:server-stack"
  | "outline:24:server"
  | "outline:24:share"
  | "outline:24:shield-check"
  | "outline:24:shield-exclamation"
  | "outline:24:shopping-bag"
  | "outline:24:shopping-cart"
  | "outline:24:signal-slash"
  | "outline:24:signal"
  | "outline:24:sparkles"
  | "outline:24:speaker-wave"
  | "outline:24:speaker-x-mark"
  | "outline:24:square-2-stack"
  | "outline:24:square-3-stack-3d"
  | "outline:24:squares-2x2"
  | "outline:24:squares-plus"
  | "outline:24:star"
  | "outline:24:stop-circle"
  | "outline:24:stop"
  | "outline:24:sun"
  | "outline:24:swatch"
  | "outline:24:table-cells"
  | "outline:24:tag"
  | "outline:24:ticket"
  | "outline:24:trash"
  | "outline:24:trophy"
  | "outline:24:truck"
  | "outline:24:tv"
  | "outline:24:user-circle"
  | "outline:24:user-group"
  | "outline:24:user-minus"
  | "outline:24:user-plus"
  | "outline:24:user"
  | "outline:24:users"
  | "outline:24:variable"
  | "outline:24:video-camera-slash"
  | "outline:24:video-camera"
  | "outline:24:view-columns"
  | "outline:24:viewfinder-circle"
  | "outline:24:wallet"
  | "outline:24:wifi"
  | "outline:24:window"
  | "outline:24:wrench-screwdriver"
  | "outline:24:wrench"
  | "outline:24:x-circle"
  | "outline:24:x-mark"
  | "solid:24:academic-cap"
  | "solid:24:adjustments-horizontal"
  | "solid:24:adjustments-vertical"
  | "solid:24:archive-box-arrow-down"
  | "solid:24:archive-box-x-mark"
  | "solid:24:archive-box"
  | "solid:24:arrow-down-circle"
  | "solid:24:arrow-down-left"
  | "solid:24:arrow-down-on-square-stack"
  | "solid:24:arrow-down-on-square"
  | "solid:24:arrow-down-right"
  | "solid:24:arrow-down-tray"
  | "solid:24:arrow-down"
  | "solid:24:arrow-left-circle"
  | "solid:24:arrow-left-on-rectangle"
  | "solid:24:arrow-left"
  | "solid:24:arrow-long-down"
  | "solid:24:arrow-long-left"
  | "solid:24:arrow-long-right"
  | "solid:24:arrow-long-up"
  | "solid:24:arrow-path-rounded-square"
  | "solid:24:arrow-path"
  | "solid:24:arrow-right-circle"
  | "solid:24:arrow-right-on-rectangle"
  | "solid:24:arrow-right"
  | "solid:24:arrow-small-down"
  | "solid:24:arrow-small-left"
  | "solid:24:arrow-small-right"
  | "solid:24:arrow-small-up"
  | "solid:24:arrow-top-right-on-square"
  | "solid:24:arrow-trending-down"
  | "solid:24:arrow-trending-up"
  | "solid:24:arrow-up-circle"
  | "solid:24:arrow-up-left"
  | "solid:24:arrow-up-on-square-stack"
  | "solid:24:arrow-up-on-square"
  | "solid:24:arrow-up-right"
  | "solid:24:arrow-up-tray"
  | "solid:24:arrow-up"
  | "solid:24:arrow-uturn-down"
  | "solid:24:arrow-uturn-left"
  | "solid:24:arrow-uturn-right"
  | "solid:24:arrow-uturn-up"
  | "solid:24:arrows-pointing-in"
  | "solid:24:arrows-pointing-out"
  | "solid:24:arrows-right-left"
  | "solid:24:arrows-up-down"
  | "solid:24:at-symbol"
  | "solid:24:backspace"
  | "solid:24:backward"
  | "solid:24:banknotes"
  | "solid:24:bars-2"
  | "solid:24:bars-3-bottom-left"
  | "solid:24:bars-3-bottom-right"
  | "solid:24:bars-3-center-left"
  | "solid:24:bars-3"
  | "solid:24:bars-4"
  | "solid:24:bars-arrow-down"
  | "solid:24:bars-arrow-up"
  | "solid:24:battery-0"
  | "solid:24:battery-100"
  | "solid:24:battery-50"
  | "solid:24:beaker"
  | "solid:24:bell-alert"
  | "solid:24:bell-slash"
  | "solid:24:bell-snooze"
  | "solid:24:bell"
  | "solid:24:bolt-slash"
  | "solid:24:bolt"
  | "solid:24:book-open"
  | "solid:24:bookmark-slash"
  | "solid:24:bookmark-square"
  | "solid:24:bookmark"
  | "solid:24:briefcase"
  | "solid:24:bug-ant"
  | "solid:24:building-library"
  | "solid:24:building-office-2"
  | "solid:24:building-office"
  | "solid:24:building-storefront"
  | "solid:24:cake"
  | "solid:24:calculator"
  | "solid:24:calendar-days"
  | "solid:24:calendar"
  | "solid:24:camera"
  | "solid:24:chart-bar-square"
  | "solid:24:chart-bar"
  | "solid:24:chart-pie"
  | "solid:24:chat-bubble-bottom-center-text"
  | "solid:24:chat-bubble-bottom-center"
  | "solid:24:chat-bubble-left-ellipsis"
  | "solid:24:chat-bubble-left-right"
  | "solid:24:chat-bubble-left"
  | "solid:24:chat-bubble-oval-left-ellipsis"
  | "solid:24:chat-bubble-oval-left"
  | "solid:24:check-badge"
  | "solid:24:check-circle"
  | "solid:24:check"
  | "solid:24:chevron-double-down"
  | "solid:24:chevron-double-left"
  | "solid:24:chevron-double-right"
  | "solid:24:chevron-double-up"
  | "solid:24:chevron-down"
  | "solid:24:chevron-left"
  | "solid:24:chevron-right"
  | "solid:24:chevron-up-down"
  | "solid:24:chevron-up"
  | "solid:24:circle-stack"
  | "solid:24:clipboard-document-check"
  | "solid:24:clipboard-document-list"
  | "solid:24:clipboard-document"
  | "solid:24:clipboard"
  | "solid:24:clock"
  | "solid:24:cloud-arrow-down"
  | "solid:24:cloud-arrow-up"
  | "solid:24:cloud"
  | "solid:24:code-bracket-square"
  | "solid:24:code-bracket"
  | "solid:24:cog-6-tooth"
  | "solid:24:cog-8-tooth"
  | "solid:24:cog"
  | "solid:24:command-line"
  | "solid:24:computer-desktop"
  | "solid:24:cpu-chip"
  | "solid:24:credit-card"
  | "solid:24:cube-transparent"
  | "solid:24:cube"
  | "solid:24:currency-bangladeshi"
  | "solid:24:currency-dollar"
  | "solid:24:currency-euro"
  | "solid:24:currency-pound"
  | "solid:24:currency-rupee"
  | "solid:24:currency-yen"
  | "solid:24:cursor-arrow-rays"
  | "solid:24:cursor-arrow-ripple"
  | "solid:24:device-phone-mobile"
  | "solid:24:device-tablet"
  | "solid:24:document-arrow-down"
  | "solid:24:document-arrow-up"
  | "solid:24:document-chart-bar"
  | "solid:24:document-check"
  | "solid:24:document-duplicate"
  | "solid:24:document-magnifying-glass"
  | "solid:24:document-minus"
  | "solid:24:document-plus"
  | "solid:24:document-text"
  | "solid:24:document"
  | "solid:24:ellipsis-horizontal-circle"
  | "solid:24:ellipsis-horizontal"
  | "solid:24:ellipsis-vertical"
  | "solid:24:envelope-open"
  | "solid:24:envelope"
  | "solid:24:exclamation-circle"
  | "solid:24:exclamation-triangle"
  | "solid:24:eye-dropper"
  | "solid:24:eye-slash"
  | "solid:24:eye"
  | "solid:24:face-frown"
  | "solid:24:face-smile"
  | "solid:24:film"
  | "solid:24:finger-print"
  | "solid:24:fire"
  | "solid:24:flag"
  | "solid:24:folder-arrow-down"
  | "solid:24:folder-minus"
  | "solid:24:folder-open"
  | "solid:24:folder-plus"
  | "solid:24:folder"
  | "solid:24:forward"
  | "solid:24:funnel"
  | "solid:24:gif"
  | "solid:24:gift-top"
  | "solid:24:gift"
  | "solid:24:globe-alt"
  | "solid:24:globe-americas"
  | "solid:24:globe-asia-australia"
  | "solid:24:globe-europe-africa"
  | "solid:24:hand-raised"
  | "solid:24:hand-thumb-down"
  | "solid:24:hand-thumb-up"
  | "solid:24:hashtag"
  | "solid:24:heart"
  | "solid:24:home-modern"
  | "solid:24:home"
  | "solid:24:identification"
  | "solid:24:inbox-arrow-down"
  | "solid:24:inbox-stack"
  | "solid:24:inbox"
  | "solid:24:information-circle"
  | "solid:24:key"
  | "solid:24:language"
  | "solid:24:lifebuoy"
  | "solid:24:light-bulb"
  | "solid:24:link"
  | "solid:24:list-bullet"
  | "solid:24:lock-closed"
  | "solid:24:lock-open"
  | "solid:24:magnifying-glass-circle"
  | "solid:24:magnifying-glass-minus"
  | "solid:24:magnifying-glass-plus"
  | "solid:24:magnifying-glass"
  | "solid:24:map-pin"
  | "solid:24:map"
  | "solid:24:megaphone"
  | "solid:24:microphone"
  | "solid:24:minus-circle"
  | "solid:24:minus-small"
  | "solid:24:minus"
  | "solid:24:moon"
  | "solid:24:musical-note"
  | "solid:24:newspaper"
  | "solid:24:no-symbol"
  | "solid:24:paint-brush"
  | "solid:24:paper-airplane"
  | "solid:24:paper-clip"
  | "solid:24:pause-circle"
  | "solid:24:pause"
  | "solid:24:pencil-square"
  | "solid:24:pencil"
  | "solid:24:phone-arrow-down-left"
  | "solid:24:phone-arrow-up-right"
  | "solid:24:phone-x-mark"
  | "solid:24:phone"
  | "solid:24:photo"
  | "solid:24:play-circle"
  | "solid:24:play-pause"
  | "solid:24:play"
  | "solid:24:plus-circle"
  | "solid:24:plus-small"
  | "solid:24:plus"
  | "solid:24:power"
  | "solid:24:presentation-chart-bar"
  | "solid:24:presentation-chart-line"
  | "solid:24:printer"
  | "solid:24:puzzle-piece"
  | "solid:24:qr-code"
  | "solid:24:question-mark-circle"
  | "solid:24:queue-list"
  | "solid:24:radio"
  | "solid:24:receipt-percent"
  | "solid:24:receipt-refund"
  | "solid:24:rectangle-group"
  | "solid:24:rectangle-stack"
  | "solid:24:rocket-launch"
  | "solid:24:rss"
  | "solid:24:scale"
  | "solid:24:scissors"
  | "solid:24:server-stack"
  | "solid:24:server"
  | "solid:24:share"
  | "solid:24:shield-check"
  | "solid:24:shield-exclamation"
  | "solid:24:shopping-bag"
  | "solid:24:shopping-cart"
  | "solid:24:signal-slash"
  | "solid:24:signal"
  | "solid:24:sparkles"
  | "solid:24:speaker-wave"
  | "solid:24:speaker-x-mark"
  | "solid:24:square-2-stack"
  | "solid:24:square-3-stack-3d"
  | "solid:24:squares-2x2"
  | "solid:24:squares-plus"
  | "solid:24:star"
  | "solid:24:stop-circle"
  | "solid:24:stop"
  | "solid:24:sun"
  | "solid:24:swatch"
  | "solid:24:table-cells"
  | "solid:24:tag"
  | "solid:24:ticket"
  | "solid:24:trash"
  | "solid:24:trophy"
  | "solid:24:truck"
  | "solid:24:tv"
  | "solid:24:user-circle"
  | "solid:24:user-group"
  | "solid:24:user-minus"
  | "solid:24:user-plus"
  | "solid:24:user"
  | "solid:24:users"
  | "solid:24:variable"
  | "solid:24:video-camera-slash"
  | "solid:24:video-camera"
  | "solid:24:view-columns"
  | "solid:24:viewfinder-circle"
  | "solid:24:wallet"
  | "solid:24:wifi"
  | "solid:24:window"
  | "solid:24:wrench-screwdriver"
  | "solid:24:wrench"
  | "solid:24:x-circle"
  | "solid:24:x-mark";

export type SpriteProps = { name: SpriteName } & JSX.IntrinsicElements["svg"];

export function Svg({ name, ...svgProps }: SpriteProps) {
  return (
    <svg {...svgProps}>
      <use href={iconsHref + "#" + name} />
    </svg>
  );
}
