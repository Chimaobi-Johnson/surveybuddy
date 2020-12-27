import React from 'react';

import * as classes from './ColorPicker.module.css';

const ColorPicker = (props) => {

    return (
            <div className={classes.modalWrapper}
                style={{
                transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                <div className={classes.modalHeader}>
                    <span className={classes.closeModalBtn} onClick={props.close}>×</span>
                </div>
                <div className={classes.modalBody}>
                    <label for="colorpicker">Color Picker:</label>
                    <input type="color" id="colorpicker" value="#0000ff" />
                </div>
            </div>
        )
    }

export default ColorPicker;