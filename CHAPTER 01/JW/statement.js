import createStatementData from './createStatementData'

export function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))
}

export function renderPlainText(data) {
  let result = `청구내역 (고객명: ${data.customer})\n`

  for (let perf of data.performances) {
    // 청구 내역을 출력한다.
    result += `${perf.play.name}: ${usd(perf.amount)} ${perf.audience}석\n`
  }

  result += `총액 ${usd(totalAmount())}\n`
  result += `적립 포인트 ${totalVolumeCredits()}점\n`

  return result

  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(aNumber / 100)
  }
}
