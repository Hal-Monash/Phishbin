import React, {useState} from "react";
import { Select } from 'antd';

function DropdownList(props) {
    const [selection, setSelection] = useState(props.value.evaluation);
    const onChangeHandler = (value)=>{
        setSelection(value);
        props.onUpdate({...props.value, evaluation:value});
    }

    return(
        <React.Fragment>
        <Select onChange= {onChangeHandler} value={selection}>
                <Select.Option value='Secure'>Secure</Select.Option>
                <Select.Option value='Phishing'>Phishing</Select.Option>
                <Select.Option value='Unevaluated'>Unevaluated</Select.Option>
        </Select>
        </React.Fragment>
    );
}
    export default DropdownList;