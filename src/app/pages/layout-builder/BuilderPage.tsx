/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import {KTSVG} from '../../../_metronic/helpers'
import {getLayout, ILayout, LayoutSetup, useLayout} from '../../../_metronic/layout/core'
import SVG from 'react-inlinesvg'
import {url} from 'inspector'
const BuilderPage: React.FC = () => {
  const {setLayout} = useLayout()
  const [tab, setTab] = useState('Header')
  const [config, setConfig] = useState<ILayout>(getLayout())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [color, setcolor] = useState('')
  const [imagColor, setimagColor] = useState('')
  const [invert, setinvert] = useState('')
  const [sepia, setsepia] = useState('')
  const [huerotate, sethuerotate] = useState('')
  const [saturate, setsaturate] = useState('')
  useEffect(() => {
    const ls = localStorage.getItem('LayoutConfig')
    if (ls) {
      var colo = JSON.parse(ls) as ILayout
      if (colo.main !== undefined) setcolor(colo.main.primaryColor)
      debugger

      //https://codepen.io/sosuke/pen/Pjoqqp

      if (
        //grren
        color === '#97e757' ||
        color === '#2c6319fa' ||
        color === '#196321fa' ||
        color === '#196343fa' ||
        color === '#19635ffa' ||
        color === '#194f63fa' ||
        color === '#446319fa' ||
        color === '#81bf00' ||
        color === '#54bf00' ||
        color === '#0ebf00' ||
        color === '#00bf39' ||
        color === '#57e78f' ||
        color === '#526319fa'
      ) {
        setinvert('100%')
        setsepia('34%')
        setsaturate('3551%')
        sethuerotate('31deg')

        setimagColor('/media/them/green.png')
      }
      if (
        //blue
        color === '#57e7d8' ||
        color === '#0073b3' ||
        color === '#57c1e7' ||
        color === '#5792e7' ||
        color === '#5764e7' ||
        color === '#193e63fa' ||
        color === '#009ebf' ||
        color === '#1200bf' ||
        color === '#001abf' ||
        color === '#0060bf' ||
        color === '#00bfab'
      ) {
        setinvert('84%')
        setsepia('53%')
        setsaturate('460%')
        sethuerotate('106deg')
        setimagColor('/media/them/blue.png')
      }

      if (
        //red
        color === '#992626' ||
        color === '#e75757' ||
        color === '#631919' ||
        color === '#633019' ||
        color === '#63191afa' ||
        color === '#631919fa' ||
        color === '#bf0000' ||
        color === '#bf4d00'
      ) {
        setinvert('9%')
        setsepia('60%')
        setsaturate('6457%')
        sethuerotate('356deg')
        debugger
        setimagColor('/media/them/red.png')
      }
      if (
        //yellow
        color === '#e7ac57' ||
        color === '#e7c057' ||
        color === '#bf7900' ||
        color === '#bf9c00' ||
        color === '#bebf00' ||
        color === '#e0e757'
      ) {
        setinvert('62%')
        setsepia('79%')
        setsaturate('809%')
        sethuerotate('20deg')
        setimagColor('/media/them/yellow.png')
      }
      if (
        //pink
        color === '#7f57e7' ||
        color === '#ae57e7' ||
        color === '#e357e7' ||
        color === '#e757a2' ||
        color === '#271963fa' ||
        color === '#461963fa' ||
        color === '#631962fa' ||
        color === '#63193ffa' ||
        color === '#63191afa' ||
        color === '#3e00bf' ||
        color === '#7300bf' ||
        color === '#a800bf' ||
        color === '#bf007e' ||
        color === '##bf0049'
      ) {
        setinvert('47%')
        setsepia('81%')
        setsaturate('1241%')
        sethuerotate('298deg')
        setimagColor('/media/them/pink.png')
      }
      if (
        //gray
        color === '#d1d1d1' ||
        color === '#3e3e3e' ||
        color === '#101010fa'
      ) {
        setinvert('37%')
        setsepia('100%')
        setsaturate('20%')
        sethuerotate('89deg')
        setimagColor('/media/them/gray.png')
      }
    }
  })

  const updateData = (fieldsToUpdate: Partial<ILayout>) => {
    const updatedData = {...config, ...fieldsToUpdate}
    setConfig(updatedData)
  }

  const updateConfig = () => {
    setConfigLoading(true)
    try {
      LayoutSetup.setConfig(config)
    } catch (error) {
      setConfig(getLayout())
    }
    setTimeout(() => {
      setLayout(config)
      setConfigLoading(false)
    }, 1000)
  }

  const reset = () => {
    setResetLoading(true)
    setTimeout(() => {
      setConfig(getLayout())
      setResetLoading(false)
    }, 1000)
  }

  return (
    <>
      <div className='card mb-10'>
        <div className='card-body d-flex align-items-center py-8'>
          {/* begin::Icon */}
          <div className='d-flex h-80px w-80px flex-shrink-0 flex-center position-relative'>
            <span className={`svg-icon ${'position-absolute opacity-15'}`}>
              <SVG
                style={{
                  filter:
                    'invert(' +
                    invert +
                    ') sepia(' +
                    sepia +
                    ') saturate(' +
                    saturate +
                    ') hue-rotate(' +
                    huerotate +
                    ') brightness(109%) contrast(84%)',
                }}
                src={process.env.PUBLIC_URL + '/media/icons/duotune/abstract/abs051.svg'}
                className='h-80px w-80px'
              />
            </span>
            <span className={`svg-icon ${'svg-icon-3x  position-absolute'}`}>
              <SVG
                style={{
                  filter:
                    'invert(' +
                    invert +
                    ') sepia(' +
                    sepia +
                    ') saturate(' +
                    saturate +
                    ') hue-rotate(' +
                    huerotate +
                    ')',
                }}
                src={process.env.PUBLIC_URL + '/media/icons/duotune/coding/cod009.svg'}
              />
            </span>
          </div>
          {/* end::Icon */}

          {/* begin::Description */}
          <div className='ms-6'>
            <p className='list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0'>
              <label style={{fontFamily: config.main?.font}}>
                این بخش برای تنظیمات پیکربندی سایت و منو ها و انتخاب تم مورد نظر شما نوشته شده است .
              </label>
            </p>
          </div>
          {/* end::Description */}
        </div>
      </div>
      <div className='card card-custom'>
        <div className='card-header card-header-stretch overflow-auto'>
          <ul
            className='nav nav-stretch nav-line-tabs fw-bold border-transparent flex-nowrap'
            role='tablist'
          >
            <li className='nav-item'>
              <a
                className={clsx(`nav-link`, {active: tab === 'Header'})}
                onClick={() => setTab('Header')}
                role='tab'
                style={{fontFamily: config.main?.font}}
              >
                نمایش منوهای بالایی
              </a>
            </li>
            {/* <li className='nav-item'>
              <a
                className={clsx(`nav-link`, {active: tab === 'Toolbar'})}
                onClick={() => setTab('Toolbar')}
                role='tab'
              >
                Toolbar
              </a>
            </li>
            <li className='nav-item'>
              <a
                className={clsx(`nav-link`, {active: tab === 'PageTitle'})}
                onClick={() => setTab('PageTitle')}
                role='tab'
              >
                Page Title
              </a>
            </li> */}
            <li className='nav-item'>
              <a
                className={clsx(`nav-link`, {active: tab === 'Aside'})}
                onClick={() => setTab('Aside')}
                role='tab'
                style={{fontFamily: config.main?.font}}
              >
                تم سایت
              </a>
            </li>
            <li className='nav-item'>
              <a
                className={clsx(`nav-link`, {active: tab === 'Content'})}
                onClick={() => setTab('Content')}
                role='tab'
                style={{fontFamily: config.main?.font}}
              >
                محتوی
              </a>
            </li>
            {/* <li className='nav-item'>
              <a
                className={clsx(`nav-link`, {active: tab === 'Footer'})}
                onClick={() => setTab('Footer')}
                role='tab'
              >
                Footer
              </a>
            </li> */}
          </ul>
        </div>
        {/* end::Header */}

        {/* begin::Form */}
        <form className='form'>
          {/* begin::Body */}
          <div className='card-body'>
            <div className='tab-content pt-3'>
              <div className={clsx('tab-pane', {active: tab === 'Header'})}>
                <div className='row mb-10'>
                  <label className='col-lg-3 col-form-label text-lg-end'>نمایش منوها:</label>
                  <div className='col-lg-9 col-xl-4'>
                    <label className='form-check form-check-custom form-check-solid form-switch mb-5'>
                      <input
                        style={{backgroundColor: config.main?.primaryColor}}
                        className='form-check-input'
                        type='checkbox'
                        name='layout-builder[layout][header][fixed][desktop]'
                        //checked={config.header.fixed.desktop}
                        onChange={() =>
                          updateData({
                            header: {
                              ...config.header,
                              fixed: {
                                ...config.header.fixed,
                                desktop: !config.header.fixed.desktop,
                              },
                            },
                          })
                        }
                      />
                    </label>

                    {/* <label className='form-check form-check-custom form-check-solid form-switch mb-3'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={config.header.fixed.tabletAndMobile}
                        onChange={() =>
                          updateData({
                            header: {
                              ...config.header,
                              fixed: {
                                ...config.header.fixed,
                                tabletAndMobile: !config.header.fixed.tabletAndMobile,
                              },
                            },
                          })
                        }
                      />
                      <span className='form-check-label text-muted'>Tablet & Mobile</span>
                    </label> */}
                  </div>
                </div>
                {/* <div className='row mb-10'>
                  <label className='col-lg-3 col-form-label text-lg-end'>Left Content:</label>
                  <div className='col-lg-9 col-xl-4'>
                    <select
                      className='form-select form-select-solid'
                      name='layout-builder[layout][header][width]'
                      value={config.header.width}
                      onChange={(e) =>
                        updateData({
                          header: {
                            ...config.header,
                            left: e.target.value as 'menu' | 'page-title',
                          },
                        })
                      }
                    >
                      <option value='menu'>Menu</option>
                      <option value='fixed'>Page title</option>
                    </select>
                    <div className='form-text text-muted'>Select header left content type.</div>
                  </div>
                </div> */}
                {/* <div className='row mb-10'>
                  <label className='col-lg-3 col-form-label text-lg-end'>Width:</label>
                  <div className='col-lg-9 col-xl-4'>
                    <select
                      className='form-select form-select-solid'
                      name='layout-builder[layout][header][width]'
                      value={config.header.width}
                      onChange={(e) =>
                        updateData({
                          header: {
                            ...config.header,
                            width: e.target.value as 'fixed' | 'fluid',
                          },
                        })
                      }
                    >
                      <option value='fluid'>Fluid</option>
                      <option value='fixed'>Fixed</option>
                    </select>
                    <div className='form-text text-muted'>Select header width type.</div>
                  </div>
                </div> */}
              </div>

              <div className={clsx('tab-pane', {active: tab === 'Toolbar'})}>
                <div className='row mb-10'>
                  <label className='col-lg-3 col-form-label text-lg-end'>Display:</label>
                  <div className='col-lg-9 col-xl-4'>
                    <div className='form-check form-check-custom form-check-solid form-switch mb-2'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        name='layout-builder[layout][toolbar][display]'
                        checked={config.toolbar.display}
                        onChange={() =>
                          updateData({
                            toolbar: {
                              ...config.toolbar,
                              display: !config.toolbar.display,
                            },
                          })
                        }
                      />
                    </div>
                    <div className='form-text text-muted'>Display toolbar</div>
                  </div>
                </div>
                <div className='row mb-10'>
                  <label className='col-lg-3 col-form-label text-lg-end'>Fixed Toolbar:</label>
                  <div className='col-lg-9 col-xl-4'>
                    <label className='form-check form-check-custom form-check-solid form-switch mb-5'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        name='layout-builder[layout][header][fixed][desktop]'
                        checked={config.toolbar.fixed.desktop}
                        onChange={() =>
                          updateData({
                            toolbar: {
                              ...config.toolbar,
                              fixed: {
                                ...config.toolbar.fixed,
                                desktop: !config.toolbar.fixed.desktop,
                              },
                            },
                          })
                        }
                      />
                      <span className='form-check-label text-muted'>Desktop</span>
                    </label>

                    <label className='form-check form-check-custom form-check-solid form-switch mb-3'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={config.toolbar.fixed.tabletAndMobileMode}
                        onChange={() =>
                          updateData({
                            toolbar: {
                              ...config.toolbar,
                              fixed: {
                                ...config.toolbar.fixed,
                                desktop: !config.toolbar.fixed.tabletAndMobileMode,
                              },
                            },
                          })
                        }
                      />
                      <span className='form-check-label text-muted'>Tablet & Mobile</span>
                    </label>

                    <div className='form-text text-muted'>Enable fixed toolbar</div>
                  </div>
                </div>
                <div className='row mb-10'>
                  <label className='col-lg-3 col-form-label text-lg-end'>Width:</label>
                  <div className='col-lg-9 col-xl-4'>
                    <select
                      className='form-select form-select-solid'
                      name='layout-builder[layout][toolbar][width]'
                      value={config.toolbar.width}
                      onChange={(e) =>
                        updateData({
                          toolbar: {
                            ...config.toolbar,
                            width: e.target.value as 'fixed' | 'fluid',
                          },
                        })
                      }
                    >
                      <option value='fluid'>Fluid</option>
                      <option value='fixed'>Fixed</option>
                    </select>
                    <div className='form-text text-muted'>Select layout width type.</div>
                  </div>
                </div>
              </div>

              <div className={clsx('tab-pane', {active: tab === 'PageTitle'})}>
                <div className='row mb-10'>
                  <label className='col-lg-3 col-form-label text-lg-end'>Display:</label>
                  <div className='col-lg-9 col-xl-4'>
                    <div className='form-check form-check-custom form-check-solid form-switch mb-2'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        name='layout-builder[layout][pageTitle][display]'
                        checked={config.pageTitle?.display}
                        onChange={() =>
                          updateData({
                            pageTitle: {
                              ...config.pageTitle!,
                              display: !config.pageTitle?.display,
                            },
                          })
                        }
                      />
                    </div>
                    <div className='form-text text-muted'>Display page title</div>
                  </div>
                </div>
                <div className='row mb-10'>
                  <label className='col-lg-3 col-form-label text-lg-end'>Breadcrumb:</label>
                  <div className='col-lg-9 col-xl-4'>
                    <div className='form-check form-check-custom form-check-solid form-switch mb-2'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        name='layout-builder[layout][pageTitle][breadCrumbs]'
                        checked={config.pageTitle?.breadCrumbs}
                        onChange={() =>
                          updateData({
                            pageTitle: {
                              ...config.pageTitle!,
                              display: !config.pageTitle?.breadCrumbs,
                            },
                          })
                        }
                      />
                    </div>
                    <div className='form-text text-muted'>Display page title</div>
                  </div>
                </div>
              </div>

              <div className={clsx('tab-pane', {active: tab === 'Content'})}>
                <div className='row mb-10'>
                  <div className='col-lg-9 col-xl-4'>
                    <select
                      className='form-select form-select-solid'
                      name='layout-builder[layout][content][width]'
                      value={config.content.width}
                      onChange={(e) =>
                        updateData({
                          content: {
                            ...config.content,
                            width: e.target.value as 'fixed' | 'fluid',
                          },
                        })
                      }
                    >
                      <option value='fluid'>شناور</option>
                      <option value='fixed'>ثابت</option>
                    </select>
                    <div className='form-text text-muted'>انتخاب نوع لای اوت</div>
                  </div>
                </div>
              </div>

              <div className={clsx('tab-pane', {active: tab === 'Aside'})}>
                {/* <div className='row mb-10'>
                  <label className='col-lg-3 col-form-label text-lg-end'>Display:</label>
                  <div className='col-lg-9 col-xl-4'>
                    <div className='switch switch-icon'>
                      <div className='form-check form-check-custom form-check-solid form-switch mb-2'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='layout-builder[layout][aside][display]'
                          checked={config.aside.display}
                          onChange={() =>
                            updateData({
                              aside: {
                                ...config.aside,
                                display: !config.aside.display,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className='form-text text-muted'>Display Aside</div>
                  </div>
                </div> */}
                {/* <div className='row mb-10'>
                  <label className='col-lg-3 col-form-label text-lg-end'>Theme:</label>
                  <div className='col-lg-9 col-xl-4'>
                    <select
                      className='form-select form-select-solid'
                      name='layout-builder[layout][aside][theme]'
                      value={config.aside.theme}
                      onChange={(e) =>
                        updateData({
                          aside: {
                            ...config.aside,
                            theme: e.target.value as 'dark' | 'light',
                          },
                        })
                      }
                    >
                      <option value='dark'>Dark</option>
                      <option value='light'>Light</option>
                    </select>
                    <div className='form-text text-muted'>Select header left content type.</div>
                  </div>
                </div> */}
                <div className='row mb-10'>
                  {/* <label className='col-lg-3 col-form-label text-lg-end'>تم:</label> */}
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#992626',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#992626', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#d1d1d1',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#d1d1d1', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#0073b3',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#0073b3', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#6c598e',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#6c598e', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#3e3e3e',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#3e3e3e', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#e7ac57',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#e7ac57', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#e7c057',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#e7c057', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#e0e757',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#e0e757', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#97e757',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#97e757', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#57e78f',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#57e78f', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#57e7d8',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#57e7d8', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#57c1e7',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#57c1e7', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#5792e7',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#5792e7', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#5764e7',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#5764e7', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#7f57e7',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#7f57e7', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#ae57e7',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#ae57e7', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#e357e7',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#e357e7', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#e757a2',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#e757a2', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#e75757',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#e75757', height: 20, width: 20, margin: 1}}
                  ></div>

                  <div className='col-lg-9 col-xl-4'>
                    {/* <select
                      className='form-select form-select-solid'
                      name='layout-builder[layout][aside][theme]'
                      value={config.main?.primaryColor}
                      onChange={(e) =>
                        updateData({
                          // aside: {
                          //   ...config.aside,
                          //   theme: e.target.value as 'dark' | 'light',
                          // },
                          main: {
                            ...config.main,
                            primaryColor: e.target.value,
                            darkSkinEnabled: true,
                            type: 'default',
                          },
                        })
                      }
                    >
                      <option value='#d1d1d1'>روشن</option>
                      <option value='#3e3e3e'>تاریک</option>
                      <option value='#992626'>قرمز</option>
                      <option value='#6c598e'>بنفش</option>
                      <option value='#0073b3'>آبی</option>
                    </select> */}
                    <div style={{fontFamily: config.main?.font}} className='form-text text-muted'>
                      انتخاب تم.
                    </div>
                    <div
                      className='cup'
                      style={{
                        backgroundRepeat: 'repeat-x',
                        background: `url('${imagColor}')`,
                      }}
                      // style={{
                      //   filter:
                      //     'invert(' +
                      //     invert +
                      //     ') sepia(' +
                      //     sepia +
                      //     ') saturate(' +
                      //     saturate +
                      //     ') hue-rotate(' +
                      //     huerotate +
                      //     ')',
                      // }}
                    ></div>
                  </div>
                </div>
                <div className='row mb-10'>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#631919',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#631919', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#633019',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#633019', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#634f19',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#634f19', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#526319fa',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#526319fa', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#446319fa',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#446319fa', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#2c6319fa',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#2c6319fa', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#196321fa',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#196321fa', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#196343fa',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#196343fa', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#19635ffa',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#19635ffa', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#194f63fa',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#194f63fa', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#193e63fa',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#193e63fa', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#192663fa',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#192663fa', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#271963fa',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#271963fa', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#461963fa',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#461963fa', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#631962fa',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#631962fa', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#63193ffa',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#63193ffa', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#63191afa',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#63191afa', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#631919fa',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#631919fa', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#101010fa',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#101010fa', height: 20, width: 20, margin: 1}}
                  ></div>
                </div>
                <div className='row mb-10'>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#bf0000',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#bf0000', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#bf4d00',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#bf4d00', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#bf7900',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#bf7900', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#bf9c00',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#bf9c00', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#bebf00',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#bebf00', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#81bf00',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#81bf00', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#54bf00',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#54bf00', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#0ebf00',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#0ebf00', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#00bf39',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#00bf39', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#00bfab',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#00bfab', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#009ebf',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#009ebf', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#0060bf',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#0060bf', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#001abf',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#001abf', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#1200bf',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#1200bf', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#3e00bf',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#3e00bf', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#7300bf',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#7300bf', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#a800bf',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#a800bf', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#bf007e',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#bf007e', height: 20, width: 20, margin: 1}}
                  ></div>
                  <div
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor: '#bf0049',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{backgroundColor: '#bf0049', height: 20, width: 20, margin: 1}}
                  ></div>
                </div>
                <div className='row mb-10'>
                  <label>انتخاب فونت</label>
                  <label style={{fontFamily: config.main?.font}}>{config.main?.font}</label>
                  <button
                    className='btn btn-sm btn-secondary me-2 mb-2'
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor:
                            config.main?.primaryColor === undefined
                              ? '#00bf39'
                              : config.main?.primaryColor,
                          font: 'tahoma',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{height: 50, width: 100, margin: 1, fontFamily: 'tahoma'}}
                  >
                    فونت tahoma
                  </button>
                  <button
                    className='btn btn-sm btn-secondary me-2 mb-2'
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor:
                            config.main?.primaryColor === undefined
                              ? '#00bf39'
                              : config.main?.primaryColor,
                          font: 'B Ziba',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{height: 50, width: 100, margin: 1, fontFamily: 'B Ziba'}}
                  >
                    فونت B Ziba
                  </button>
                  <button
                    className='btn btn-sm btn-secondary me-2 mb-2'
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor:
                            config.main?.primaryColor === undefined
                              ? '#00bf39'
                              : config.main?.primaryColor,
                          font: 'IRANSansX',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{height: 50, width: 100, margin: 1, fontFamily: 'IRANSansX'}}
                  >
                    فونت IRANSansX
                  </button>
                  <button
                    className='btn btn-sm btn-secondary me-2 mb-2'
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor:
                            config.main?.primaryColor === undefined
                              ? '#00bf39'
                              : config.main?.primaryColor,
                          font: 'B-Titr',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{height: 50, width: 100, margin: 1, fontFamily: 'B-Titr'}}
                  >
                    فونت B-Titr
                  </button>
                  <button
                    className='btn btn-sm btn-secondary me-2 mb-2'
                    onClick={(e) =>
                      updateData({
                        main: {
                          ...config.main,
                          primaryColor:
                            config.main?.primaryColor === undefined
                              ? '#00bf39'
                              : config.main?.primaryColor,
                          font: 'B-Shadi',
                          darkSkinEnabled: true,
                          type: 'default',
                        },
                      })
                    }
                    style={{height: 50, width: 100, margin: 1, fontFamily: 'B-Titr'}}
                  >
                    فونت B-Shadi
                  </button>
                </div>
                {/* <div className='row mb-10'>
                  <label className='col-lg-3 col-form-label text-lg-end'>Fixed:</label>
                  <div className='col-lg-9 col-xl-4'>
                    <div className='switch switch-icon'>
                      <div className='form-check form-check-custom form-check-solid form-switch mb-2'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='layout-builder[layout][aside][fixed]'
                          checked={config.aside.fixed}
                          onChange={() =>
                            updateData({
                              aside: {
                                ...config.aside,
                                display: !config.aside.fixed,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className='form-text text-muted'>Enable fixed aside</div>
                  </div>
                </div>
                <div className='row mb-10'>
                  <label className='col-lg-3 col-form-label text-lg-end'>Minimize:</label>
                  <div className='col-lg-9 col-xl-4'>
                    <div className='switch switch-icon'>
                      <div className='form-check form-check-custom form-check-solid form-switch mb-2'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='layout-builder[layout][aside][minimize]'
                          checked={config.aside.minimize}
                          onChange={() =>
                            updateData({
                              aside: {
                                ...config.aside,
                                display: !config.aside.minimize,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className='form-text text-muted'>Enable aside minimization</div>
                  </div>
                </div>
                <div className='row mb-10'>
                  <label className='col-lg-3 col-form-label text-lg-end'>Minimized:</label>
                  <div className='col-lg-9 col-xl-4'>
                    <div className='switch switch-icon'>
                      <div className='form-check form-check-custom form-check-solid form-switch mb-2'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='layout-builder[layout][aside][minimized]'
                          checked={config.aside.minimized}
                          onChange={() =>
                            updateData({
                              aside: {
                                ...config.aside,
                                display: !config.aside.minimized,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className='form-text text-muted'>Default minimized aside</div>
                  </div>
                </div>
                <div className='row mb-10'>
                  <label className='col-lg-3 col-form-label text-lg-end'>Hoverable:</label>
                  <div className='col-lg-9 col-xl-4'>
                    <div className='switch switch-icon'>
                      <div className='form-check form-check-custom form-check-solid form-switch mb-2'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='layout-builder[layout][aside][hoverable]'
                          checked={config.aside.hoverable}
                          onChange={() =>
                            updateData({
                              aside: {
                                ...config.aside,
                                display: !config.aside.hoverable,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className='form-text text-muted'>Enable hoverable minimized aside</div>
                  </div>
                </div> */}
              </div>

              <div className={clsx('tab-pane', {active: tab === 'Footer'})}>
                <div className='row mb-10'>
                  <div className='col-lg-9 col-xl-4'>
                    <select
                      className='form-select form-select-solid'
                      name='layout-builder[layout][footer][width]'
                      value={config.footer.width}
                      onChange={(e) =>
                        updateData({
                          footer: {
                            ...config.footer,
                            width: e.target.value as 'fixed' | 'fluid',
                          },
                        })
                      }
                    >
                      <option value='fluid'>شناور</option>
                      <option value='fixed'>ثابت</option>
                    </select>
                    <div className='form-text text-muted'>انتخاب لای اوت.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end::Body */}

          {/* begin::Footer */}
          <div className='card-footer py-6'>
            <div className='row'>
              <div className='col-lg-3'></div>
              <div className='col-lg-9'>
                <button
                  style={{backgroundColor: config.main?.primaryColor}}
                  type='button'
                  onClick={updateConfig}
                  className='btn  me-2'
                >
                  {!configLoading && (
                    <span style={{color: 'white'}} className='indicator-label'>
                      اعمال تغیرات
                    </span>
                  )}
                  {configLoading && (
                    <div
                      className='k-overlay'
                      style={{backgroundColor: config.main?.primaryColor}}
                    ></div>
                    // <div className='col-lg-9 col-xl-4'>
                    //   <div
                    //     className='k-overlay'
                    //     style={{
                    //       width: '1500px',
                    //       height: '1000px',
                    //       background:
                    //         'repeating-conic-gradient(' +
                    //         config.main?.primaryColor +
                    //         ' 0 4%, #0000 0 9%) #fff',
                    //       backgroundRepeat: 'no-repeat',
                    //       filter: 'blur(35px) contrast(20)',
                    //       boxShadow: '0 0 0 50px #fff',
                    //     }}
                    //   ></div>
                    // </div>
                  )}
                  {configLoading && (
                    <span style={{color: 'white', display: 'block'}} className='indicator-progress'>
                      لطفا منتظر بمانید...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>

                {/* <button
                  type='button'
                  id='kt_layout_builder_reset'
                  className='btn btn-active-light btn-color-muted'
                  onClick={reset}
                >
                  {!resetLoading && <span className='indicator-label'>Reset</span>}
                  {resetLoading && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      Please wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button> */}
              </div>
            </div>
          </div>
          {/* end::Footer */}
        </form>
        {/* end::Form */}
      </div>
    </>
  )
}

export {BuilderPage}
