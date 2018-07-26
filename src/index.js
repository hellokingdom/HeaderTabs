import { el, list, mount, text, setStyle } from 'redom'
import classNames from './styles.css'

class Li {
  update(data, index, items, context) {
    const isVisible =
      index < context.totalTabs ? classNames.isVisible : classNames.isHidden
    if (index === context.activeTab) {
      this.el = el(
        'li.' +
          classNames.tabLayout +
          '.' +
          classNames.tabActive +
          '.' +
          isVisible,
        el('a', {
          text: data.name,
          href: data.link
        })
      )
    } else {
      this.el = el(
        'li.' + classNames.tabLayout + '.' + isVisible,
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
        totalTabs: 6,
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

    TopTabs.prototype.addTabs = function() {
      const ul = list('ul.' + classNames.tabList, Li)
      ul.update(this.options.channels, {
        activeTab: this.options.activeTab,
        totalTabs: this.options.totalTabs
      })
      const layout = el('div.' + classNames.tabHeader, ul)
      const resize = () => {
        ul.update(this.options.channels, {
          activeTab: this.options.activeTab,
          totalTabs: Math.trunc(window.innerWidth / 150)
        })
      }
      window.onresize = function(event) {
        resize()
      }
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
  activeTab: 3
})
