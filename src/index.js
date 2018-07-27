import { el, list, mount, text, setStyle } from 'redom'
import classNames from './styles.css'

class Li {
  update(data, index, items, context) {
    const isVisible =
      index < context.visibleTabs ? classNames.isVisible : classNames.isHidden
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

class LiMenu {
  update(data, index, items, context) {
    const isVisible =
      index < context.visibleTabs ? classNames.isHidden : classNames.isVisible
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
        totalTabs: Math.trunc(window.innerWidth / 150),
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
            name: 'Eat Fresh',
            link: 'https://my.morrisons.com/'
          }
        ]
      }

      this.options = extend(defaults, options)
      this.ulMenu = list('ul', LiMenu)
      this.ul = list('ul.' + classNames.tabList, Li)

      this.layout = el('div.' + classNames.tabHeader, this.ul)
      this.layoutMenu = el('div', this.ulMenu)

      mount(document.body, this.layoutMenu, document.body.firstChild)
      mount(document.body, this.layout, document.body.firstChild)
    }

    TopTabs.prototype.updateState = function() {
      this.ul.update(this.options.channels, {
        activeTab: this.options.activeTab,
        visibleTabs: Math.trunc(window.innerWidth / 150)
      })
      this.ulMenu.update(this.options.channels, {
        activeTab: this.options.activeTab,
        visibleTabs: Math.trunc(window.innerWidth / 150)
      })
    }

    TopTabs.prototype.onResize = function() {
      const resize = () => {
        this.updateState()
      }
      window.onresize = function(event) {
        resize()
      }
    }

    TopTabs.prototype.addMenu = function() {
      this.ulMenu.update(this.options.channels, {
        activeTab: this.options.activeTab,
        totalTabs: this.options.totalTabs
      })
    }

    TopTabs.prototype.addTabs = function() {
      this.ul.update(this.options.channels, {
        activeTab: this.options.activeTab,
        totalTabs: this.options.totalTabs
      })
    }

    return TopTabs
  })()

  tt.init = function(options) {
    const tabs = new tt.TopTabs(options)
    tabs.addTabs()
    tabs.addMenu()
    tabs.onResize()
  }

  window.morrisonstabs = tt
})(window.morrisonstabs || {})

// Code intialised on the target site
window.morrisonstabs.init({
  activeTab: 3
})
