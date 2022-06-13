import createStatementData from './createStatementData'

export function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))
}

function renderPlainText(data) {
  let result = `청구내역 (고객명: ${data.customer})\n`

  for (let perf of data.performances) {
    // 청구 내역을 출력한다.
    result += `${perf.play.name}: ${usd(perf.amount)} ${perf.audience}석\n`
  }

  result += `총액 ${usd(totalAmount())}\n`
  result += `적립 포인트 ${totalVolumeCredits()}점\n`

  return result
}

export function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays))
}

function renderHtml(data) {
  let result = `<h1>청구 내역 ${data.customer}</h1>\n`

  result += '<table>\n'
  result += '<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>'

  for (let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>${perf.audience}석</td>`
    result += `<td>${usd(perf.amount)}</td></tr>\n`
  }
  result += '</table>\n'
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`
  result += `<p>적립포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`

  return result
}

function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(aNumber / 100)
}
