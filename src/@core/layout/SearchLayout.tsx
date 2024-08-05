import {useIntl} from 'react-intl'
type Props = {
  onSubmit: (data: any) => void
  onReset: (data: any) => void
  children: JSX.Element | JSX.Element[]
}
export function SearchLayout(props: Props) {
  const intl = useIntl()
  const {onSubmit, onReset, children} = props

  return (
    <div className='row'>
      <div className='card card-px-0 mb-2 shadow bg-lighten '>
        <div className='card-body'>
          <form onSubmit={onSubmit} className='row g-3'>
            {children}
            <div className='col d-flex flex-row-reverse'>
              <button
                className='btn btn-sm btn-secondary me-2 mb-2'
                type='button'
                onClick={onReset}
              >
                {intl.formatMessage({id: 'MENU.CLEAN'})}
              </button>
              <button className='btn btn-sm btn-secondary me-2 mb-2' type='submit'>
                {intl.formatMessage({id: 'MENU.SEARCH'})}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
