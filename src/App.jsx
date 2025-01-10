
import './App.css'
import TableWrapper from './components/table/table'
import { Button } from './components/ui/button'
import { Table } from './components/ui/table'

export default function App() {
  return (
    <>
    <h1 className="text-3xl font-bold  text-center text-red-500">
      Payment Gateway
    </h1>
      <Button>Testing</Button>
      <TableWrapper/>
    </>
  )
}