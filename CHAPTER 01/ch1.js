const invoices = [
  {
    customer: "Cho",
    performances: [
      {
        playId: "hamlet",
        audience: 55,
      },
      {
        playId: "as-like",
        audience: 35,
      },
      {
        playId: "othello",
        audience: 40,
      },
    ],
  },
];

const plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};

console.log(statement(invoices[0], plays));

// ~1.5 리팩터링
function statement(invoice, plays) {
  function amountFor(aPerformance) {
    let result = 0;

    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르 ${playFor(aPerformance).type}`);
    }
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playId];
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if (playFor(aPerformance).type === "comedy") {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  // 기존 변수 totalAmount와 처음에 겹치기 때문에 임시로 이름 지었다가 인라인 후 totalAmount로 함수 이름 변경
  function totalAmount() {
    let result = 0; // 총액
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }

  let result = `청구 내역 ( 고객 : ${invoice.customer} )\n`;
  for (let perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    }석)\n`;
  }

  result += `총액 : ${usd(totalAmount())}\n`;
  result += `적립 포인트 : ${totalVolumeCredits()}점\n`; // 인라인화
  return result;
}
