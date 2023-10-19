import Heading from "./Heading"

class CreateForm extends React
{
    render()
    {
        return (
            <div>
                <Heading content="Contacts"/>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name"/>
                    <input type="submit" value="Add"/>
                </form>
            </div>
        )
    }
}