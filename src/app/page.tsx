
import { Toaster } from 'react-hot-toast';
import TriggerGenerator from './components/TriggerGenerator'
export default function Home() {
  return (
    <main>
       <TriggerGenerator />
       <Toaster position="top-center"/>
    </main>
  )
}
