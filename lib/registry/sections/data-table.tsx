import { Table2 } from 'lucide-react'

import type { ConfiguratorOption } from '@/lib/registry/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface OrderRow {
  klant: string
  bedrag: string
  status: 'Voltooid' | 'In behandeling' | 'Verzonden' | 'Geannuleerd'
  datum: string
}

const ORDERS: OrderRow[] = [
  { klant: 'Van der Berg Logistiek B.V.', bedrag: '€ 4.280,00', status: 'Voltooid', datum: '18 jul 2026' },
  { klant: 'De Groot Interieurbouw', bedrag: '€ 1.960,50', status: 'Verzonden', datum: '17 jul 2026' },
  { klant: 'Bakker & Zonen Techniek', bedrag: '€ 8.140,00', status: 'In behandeling', datum: '17 jul 2026' },
  { klant: 'Studio Maria Ontwerp', bedrag: '€ 620,00', status: 'Voltooid', datum: '15 jul 2026' },
  { klant: 'Hoekstra Bouwmaterialen', bedrag: '€ 2.375,25', status: 'Geannuleerd', datum: '14 jul 2026' },
  { klant: 'Jansen Facilitair', bedrag: '€ 3.050,00', status: 'In behandeling', datum: '12 jul 2026' },
]

function statusVariant(status: OrderRow['status']): 'success' | 'secondary' | 'outline' | 'destructive' {
  switch (status) {
    case 'Voltooid':
      return 'success'
    case 'Verzonden':
      return 'secondary'
    case 'Geannuleerd':
      return 'destructive'
    default:
      return 'outline'
  }
}

function DataTablePreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recente bestellingen</CardTitle>
        <CardDescription>De laatste 6 orders uit alle verkoopkanalen</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="preview-scroll overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="whitespace-nowrap px-6 py-2.5 font-medium">Klant</th>
                <th className="whitespace-nowrap px-4 py-2.5 font-medium">Bedrag</th>
                <th className="whitespace-nowrap px-4 py-2.5 font-medium">Status</th>
                <th className="whitespace-nowrap px-4 py-2.5 pr-6 font-medium">Datum</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((order) => (
                <tr key={order.klant} className="border-b border-border last:border-0">
                  <td className="whitespace-nowrap px-6 py-2.5 font-medium text-foreground">
                    {order.klant}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-foreground">{order.bedrag}</td>
                  <td className="whitespace-nowrap px-4 py-2.5">
                    <Badge variant={statusVariant(order.status)}>{order.status}</Badge>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 pr-6 text-muted-foreground">
                    {order.datum}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export const dataTableOption: ConfiguratorOption = {
  id: 'data-table',
  label: 'Datatabel',
  description: 'Overzichtstabel met recente bestellingen, statusbadges en bedragen.',
  thumbnailIcon: Table2,
  category: 'section',
  PreviewComponent: DataTablePreview,
}
