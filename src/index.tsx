import Main from "@/components/main/main";
import {Provider} from "react-redux";
import store from '@/scripts/redux/slices/index';
import {render} from "react-dom";

const rootElement = document.getElementById("root");

function Root(){
    return(<>
        <Provider store={store}>
            <Main/>
        </Provider>
    </>)
}
render(<Root/>, rootElement);
