import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";

const Page404 = () => {
    return(
        <div>

            <ErrorMessage/>
            <h1 style={{'textAlign': 'center'}}>Error 404</h1>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }} to='/'>Back to main page</Link>
        </div>
    )
};

export default Page404;