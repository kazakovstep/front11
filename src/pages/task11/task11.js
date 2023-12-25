import {withSummaryAdvertLayout} from "../../Layout/SummaryAdvertLayout/SummaryAdvertLayout";
import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";
import {useEffect, useMemo, useState} from "react";

const Task11 = () => {

    const [elements, setElements] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [sum, setSum] = useState(0);
    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleAdd = () => {
        if(inputValue){
            setElements([...elements, Number(inputValue)]);
            setInputValue('');
        }
    }

    useEffect(() => {
          const totalSum = elements.reduce((acc, curr) => acc + curr, 0);
          setSum(totalSum);
    }, [elements]);

    const [sortType, setSortType] = useState('');

    const sortedElements = useMemo(() => {
        if (sortType === 'asc') {
            return [...elements].sort((a, b) => a - b);
        } else if (sortType === 'desc') {
            return [...elements].sort((a, b) => b - a);
        }
        return elements;
    }, [elements, sortType]);

    const handleSortAsc = () => {
        setSortType('asc');
    };

    const handleSortDesc = () => {
        setSortType('desc');
    };

    const [filtered, setFiltered] = useState([]);

    const filterArray = () => {
        const from = document.querySelector('input[placeholder="От"]')?.value;
        const to = document.querySelector('input[placeholder="До"]')?.value;
        setFiltered(elements.filter(element => element >= Number(from) && element <= Number(to)));
    }

    const deleteAll = () => {
        setElements([]);
    }

    const [inputValueDelete, setInputValueDelete] = useState('');
    const deleteElement = () => {

        const updatedArray = elements.filter(item => item !== Number(inputValueDelete));
        setElements(updatedArray);
    }

    const handleChangeDel = (event) => {
        setInputValueDelete(event.target.value);
    }

    return(
        <>
            <div style={{width: "50%", margin:"5rem auto", display:"flex", flexDirection:"column", gap:"1rem"}}>
                <div>Елементы : {elements.join(', ')}</div>
                <div>Сумма товаров: {sum}</div>
                <div style={{display:"flex", gap:"1rem"}}>
                    <Input type={"number"} state={"default"} value={inputValue} onChange={handleChange} placeholder={"Введите стоимость товара"}/>
                    <Button state={"default"} type={"primary"} onClick={handleAdd}>Добавить</Button>
                </div>
                <Button state={"default"} type={"secondary"} onClick={handleSortAsc}>По возрастанию</Button>
                <Button state={"default"} type={"secondary"} onClick={handleSortDesc}>По убыванию</Button>
                {sortType!=='' ?
                    <div>{sortType==='asc' ? "Товары по возрастанию цены" : "Товары по убыванию цены"}<br/> {sortedElements.join(', ')}</div> : null}
                <div style={{display:"flex", gap:"1rem"}}>
                    <Input type={"number"} state={"default"} placeholder={"От"}/>
                    <Input type={"number"} state={"default"} placeholder={"До"}/>
                    <Button state={"default"} type={"secondary"} onClick={filterArray}>Фильтрация</Button>
                </div>
                {filtered.length > 0 ? <div>Фильтр: {filtered.join(', ')}</div> : null}
                <Button state={"default"} type={"secondary"} onClick={deleteAll}>Удалить всё</Button>
                <div style={{display:"flex", gap:"1rem"}}>
                    <Input type={"number"} state={"default"} value={inputValueDelete} onChange={handleChangeDel} placeholder={"Введите стоимость товара"}/>
                    <Button state={"default"} type={"primary"} onClick={deleteElement}>Удалить</Button>
                </div>
            </div>
        </>
    );
}
export default withSummaryAdvertLayout(Task11)