/* lalag visual editor bridge — runs INSIDE the preview iframe */
;(function () {
  'use strict'
  if (window.self === window.top) return  // only run inside iframe

  var PINK = '#F0516A'
  var current = null

  /* ── overlays ─────────────────────────────────────────── */
  function makeOverlay(css) {
    var d = document.createElement('div')
    d.style.cssText = 'position:fixed;pointer-events:none;z-index:99990;display:none;' + css
    document.documentElement.appendChild(d)
    return d
  }

  var ghost = makeOverlay(
    'border:1.5px dashed ' + PINK + ';border-radius:6px;' +
    'background:rgba(240,81,106,.04);' +
    'box-shadow:0 0 0 4px rgba(240,81,106,.06);'
  )
  var ring = makeOverlay(
    'border:2px solid ' + PINK + ';border-radius:6px;' +
    'background:rgba(240,81,106,.03);' +
    'box-shadow:0 0 0 5px rgba(240,81,106,.18),0 0 30px rgba(240,81,106,.12);'
  )
  var badge = makeOverlay(
    'background:' + PINK + ';color:#fff;font:700 10px/1 system-ui,sans-serif;' +
    'padding:3px 7px;border-radius:3px;letter-spacing:.08em;text-transform:uppercase;' +
    'box-shadow:0 2px 8px rgba(0,0,0,.3);white-space:nowrap;'
  )

  function fitOverlay(el, ov) {
    var r = el.getBoundingClientRect()
    var scroll = window.pageYOffset || document.documentElement.scrollTop
    ov.style.top    = (r.top  - 2) + 'px'
    ov.style.left   = (r.left - 2) + 'px'
    ov.style.width  = (r.width  + 4) + 'px'
    ov.style.height = (r.height + 4) + 'px'
    ov.style.display = 'block'
  }

  function fitBadge(el) {
    var r = el.getBoundingClientRect()
    badge.textContent = (el.dataset.editable || '').replace(/_/g, ' ')
    badge.style.top  = Math.max(r.top - 22, 4) + 'px'
    badge.style.left = r.left + 'px'
    badge.style.display = 'block'
  }

  /* ── cursor fix ──────────────────────────────────────── */
  var style = document.createElement('style')
  style.textContent = 'body,body *{cursor:auto!important}[data-editable]{cursor:pointer!important}'
  document.head.appendChild(style)

  /* ── hover ───────────────────────────────────────────── */
  document.addEventListener('mouseover', function (e) {
    var t = e.target && e.target.closest && e.target.closest('[data-editable]')
    if (t) { fitOverlay(t, ghost) }
    else    { ghost.style.display = 'none' }
  })
  document.addEventListener('mouseout', function (e) {
    if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest('[data-editable]'))
      ghost.style.display = 'none'
  })

  /* ── click (select) ──────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest && e.target.closest('[data-editable]')
    if (t) {
      e.preventDefault(); e.stopPropagation()
      current = t
      fitOverlay(t, ring); fitBadge(t)
      window.parent.postMessage({
        type: 'LALAG_SELECT',
        field: t.dataset.editable,
        value: (t.innerText || t.textContent || '').trim()
      }, '*')
    } else {
      current = null
      ring.style.display = 'none'
      badge.style.display = 'none'
      window.parent.postMessage({ type: 'LALAG_DESELECT' }, '*')
    }
  }, true)

  /* block all link navigation */
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('a')
    if (a) e.preventDefault()
  })

  /* ── messages from parent ────────────────────────────── */
  window.addEventListener('message', function (e) {
    var d = e.data
    if (!d || !d.type) return

    if (d.type === 'LALAG_UPDATE') {
      var el = document.querySelector('[data-editable="' + d.field + '"]')
      if (el) {
        el.textContent = d.value
        if (current && current.dataset.editable === d.field) { fitOverlay(el, ring); fitBadge(el) }
      }
    }

    if (d.type === 'LALAG_SCROLL_TO') {
      var sec = document.querySelector('[data-section="' + d.section + '"]')
      if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    if (d.type === 'LALAG_FOCUS_FIELD') {
      var fe = document.querySelector('[data-editable="' + d.field + '"]')
      if (fe) {
        current = fe
        fitOverlay(fe, ring); fitBadge(fe)
        fe.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  })

  /* reposition on scroll */
  document.addEventListener('scroll', function () {
    if (current) { fitOverlay(current, ring); fitBadge(current) }
  }, true)

  window.parent.postMessage({ type: 'LALAG_READY' }, '*')
})()
