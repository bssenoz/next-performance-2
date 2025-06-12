import GoodFormExample from './GoodFormExample'
import BadFormExample from './BadFormExample'

const Form = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GoodFormExample />
          <BadFormExample />
        </div>
    )
}

export default Form


