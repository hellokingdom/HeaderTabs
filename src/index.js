import { el, list, mount, text, setStyle } from 'redom'
import classNames from './styles.css'

class Li {
  update(data, index, items, context) {
    if (index === context.activeTab) {
      this.el = el(
        'li.' + classNames.tabLayout + '.' + classNames.tabActive,
        el('a', {
          text: data.name,
          href: data.link
        })
      )
    } else {
      this.el = el(
        'li.' + classNames.tabLayout,
        el('a', { text: data.name, href: data.link })
      )
    }
  }
}

const MorrisonsTabs = (function(tt) {
  const extend = function(defaults, options) {
    const extended = {}
    let prop
    for (prop in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
        extended[prop] = defaults[prop]
      }
    }
    for (prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        extended[prop] = options[prop]
      }
    }
    return extended
  }

  tt.TopTabs = (function() {
    function TopTabs(options) {
      const defaults = {
        activeTab: 0,
        channels: [
          {
            name: 'Groceries',
            link: 'https://groceries.morrisons.com/webshop/startWebshop.do'
          },
          {
            name: 'Food To Order',
            link: 'https://my.morrisons.com/foodtoorder/'
          },
          {
            name: 'Flowerworld',
            link: 'https://www.flowerworld.co.uk'
          },
          {
            name: 'Morrisons More',
            link: 'https://my.morrisons.com/more/'
          },
          {
            name: 'Blog',
            link: 'https://my.morrisons.com/'
          },
          {
            name: 'New Link',
            link: 'https://my.morrisons.com/'
          }
        ]
      }

      this.options = extend(defaults, options)
    }

    TopTabs.prototype.createTabs = function() {
      const ul = list('ul.' + classNames.tabList, Li)
      ul.update(this.options.channels, { activeTab: this.options.activeTab })
      return ul
    }

    TopTabs.prototype.addTabs = function() {
      const ul = this.createTabs()
      const layout = el('div.' + classNames.tabHeader, ul)
      mount(document.body, layout, document.body.firstChild)
    }

    return TopTabs
  })()

  tt.init = function(options) {
    const tabs = new tt.TopTabs(options)
    tabs.addTabs()
  }

  window.morrisonstabs = tt
})(window.morrisonstabs || {})

// Code intialised on the target site
window.morrisonstabs.init({
  activeTab: 0
})
