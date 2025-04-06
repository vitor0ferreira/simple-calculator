import { useState } from 'react'
import './App.css'

function App() {

  const [count, setCount] = useState<string>('')
  const [result, setResult] = useState<string>('')
  const [lastClick, setLastClick] = useState<string>('')
  
  type MathOperationKey = 'add' | 'divide' | 'multiply' | 'subtract' | string

  const mathOperations: string[] = ['+', '-', '/', '*']
  const mathOperationsTransformation: Record<MathOperationKey, string> = {
    add: "+",
    divide: "/",
    multiply: "*",
    subtract: "-"
  }

  function onClickNumber(id: string){

    if(lastClick == "equals"){
      setCount(id)
      setResult(id)

    } else if(!mathOperations.includes(lastClick)) {
      setCount((previousCount) => previousCount + id)
      setResult((previousResult) => previousResult + id)

    } else if (mathOperations.includes(lastClick) && id !== mathOperationsTransformation[lastClick]) {
      setCount((previousCount) => previousCount + id)
      setResult(id)

    } else if(lastClick == mathOperationsTransformation.subtract && count[count.length - 1] !== '-'){
      setCount((previousCount)=> previousCount + "-" + id)
    }

    setLastClick(id)
  }

  function onClickOperator(id: MathOperationKey){
    if(mathOperations.includes(lastClick) || lastClick == 'decimal')
      return
    else if(lastClick !== 'equals') {
      setCount((previousCount)=> previousCount + mathOperationsTransformation[id])
      setResult(mathOperationsTransformation[id])
    } else {
      setCount(result + mathOperationsTransformation[id])
      setResult(mathOperationsTransformation[id])
    }
    setLastClick(mathOperationsTransformation[id])
  }

  function onClickDecimal(){
    if(lastClick == 'decimal' || mathOperations.includes(lastClick) || result.includes("."))
      return
    else {
      setCount((previousCount)=> previousCount + '.')
      setResult((previousResult)=> previousResult + '.')
    }
    setLastClick('decimal')
  }
  

  function equalsTo(){
    const finalResult = eval(count)
    setCount((previousCount)=> previousCount + "=" + finalResult)
    setResult(finalResult)
    setLastClick("equals")
  }

  const cleanAll = () => {
    setCount('')
    setResult('')
    setLastClick('')
  }

  return (
    <>
      <main className='bg-red-200 min-h-screen min-w-[1024px] p-2 flex items-center justify-center'>
        <section id='calculator' className='w-[340px] h-max bg-black grid grid-cols-4 grid-rows-4 gap-y-0.5 gap-x-0.5 p-2'>
          <div id='display' className='col-span-4 bg-black text-end flex flex-col text-3xl overflow-x-clip'>
            <span className='text-amber-600'>{count}</span>
            <span>{result}</span>
          </div>
          <button id='clear' onClick={cleanAll} className="bg-red-500 size-full cursor-pointer col-span-2 text-slate-100 text-3xl font-semibold hover:brightness-75 hover:text-neutral-800 hover:outline hover:outline-white">AC</button>
          <button onClick={(e)=>onClickOperator(e.currentTarget.id)} id='divide' className="bg-emerald-700 size-full cursor-pointer text-slate-100 text-2xl font-semibold hover:brightness-75 hover:text-neutral-800 hover:outline hover:outline-white">/</button>
          <button onClick={(e)=>onClickOperator(e.currentTarget.id)} id='multiply' className="bg-emerald-700 size-full cursor-pointer  text-slate-100 text-2xl font-semibold hover:brightness-75 hover:text-neutral-800 hover:outline hover:outline-white">X</button>
          <button onClick={(e)=>onClickNumber(e.currentTarget.id)} id='7' className="bg-neutral-700 size-20 cursor-pointer text-slate-100 text-2xl font-bold hover:bg-neutral-500 hover:text-neutral-800 hover:outline hover:outline-white">7</button>
          <button onClick={(e)=>onClickNumber(e.currentTarget.id)} id='8' className="bg-neutral-700 size-20 cursor-pointer text-slate-100 text-2xl font-bold hover:bg-neutral-500 hover:text-neutral-800 hover:outline hover:outline-white">8</button>
          <button onClick={(e)=>onClickNumber(e.currentTarget.id)} id='9' className="bg-neutral-700 size-20 cursor-pointer text-slate-100 text-2xl font-bold hover:bg-neutral-500 hover:text-neutral-800 hover:outline hover:outline-white">9</button>
          <button onClick={(e)=>onClickOperator(e.currentTarget.id)} id='subtract' className="bg-emerald-700 size-20 cursor-pointer text-slate-100 text-2xl font-bold hover:brightness-75 hover:text-neutral-800 hover:outline hover:outline-white">-</button>
          <button onClick={(e)=>onClickNumber(e.currentTarget.id)} id='4' className="bg-neutral-700 size-20 cursor-pointer text-slate-100 text-2xl font-bold hover:bg-neutral-500 hover:text-neutral-800 hover:outline hover:outline-white">4</button>
          <button onClick={(e)=>onClickNumber(e.currentTarget.id)} id='5' className="bg-neutral-700 size-20 cursor-pointer text-slate-100 text-2xl font-bold hover:bg-neutral-500 hover:text-neutral-800 hover:outline hover:outline-white">5</button>
          <button onClick={(e)=>onClickNumber(e.currentTarget.id)} id='6' className="bg-neutral-700 size-20 cursor-pointer text-slate-100 text-2xl font-bold hover:bg-neutral-500 hover:text-neutral-800 hover:outline hover:outline-white">6</button>
          <button onClick={(e)=>onClickOperator(e.currentTarget.id)} id='add' className="bg-emerald-700 size-20 cursor-pointer text-slate-100 text-2xl font-bold hover:brightness-75 hover:text-neutral-800 hover:outline hover:outline-white">+</button>
          <button onClick={(e)=>onClickNumber(e.currentTarget.id)} id='1' className="bg-neutral-700 size-20 cursor-pointer text-slate-100 text-2xl font-bold hover:bg-neutral-500 hover:text-neutral-800 hover:outline hover:outline-white">1</button>
          <button onClick={(e)=>onClickNumber(e.currentTarget.id)} id='2' className="bg-neutral-700 size-20 cursor-pointer text-slate-100 text-2xl font-bold hover:bg-neutral-500 hover:text-neutral-800 hover:outline hover:outline-white">2</button>
          <button onClick={(e)=>onClickNumber(e.currentTarget.id)} id='3' className="bg-neutral-700 size-20 cursor-pointer text-slate-100 text-2xl font-bold hover:bg-neutral-500 hover:text-neutral-800 hover:outline hover:outline-white">3</button>
          <button onClick={()=>equalsTo()} id='equals' className="bg-blue-700 cursor-pointer text-slate-100 text-2xl font-bold hover:brightness-75 hover:text-neutral-800 hover:outline hover:outline-white size-full row-span-2">=</button>
          <button onClick={(e)=>onClickNumber(e.currentTarget.id)} id='0' className="bg-neutral-700 cursor-pointer text-slate-100 text-2xl font-bold hover:bg-neutral-500 hover:text-neutral-800 hover:outline hover:outline-white size-full col-span-2">0</button>
          <button onClick={()=>onClickDecimal()} id='decimal' className="bg-neutral-700 cursor-pointer text-slate-100 text-2xl font-bold hover:brightness-75 hover:text-neutral-800 hover:outline hover:outline-white size-20">.</button>
        </section>
      </main>
    </>
  )
}

export default App
