import styles from './Checkbox.module.css';

export const Checkbox=({form,id, checked, onChange})=>{
    const handleCheckbox = (e) => {
        onChange && onChange(e.target.checked);
      };


    const handleRadio = (e) => {
      const targets = document.querySelectorAll('input[id="checkbox"]');
      targets.forEach((target) => {
        target.checked = target === e.target;
      });
    }

    switch(form){
        case 'square':
            return <>
                <div className={styles.wrapper}>
                    <input className={styles.square} id={id} type="checkbox" checked={checked} onChange={handleCheckbox}/>
                </div>
            </>;
        case 'circle':
            return <>
                <div className={styles.wrapper}>
                    <input className={styles.circle} id={id} type="checkbox" checked={checked} onChange={handleRadio}/>
                </div>
            </>;
        default:
            return <></>;
    }
}