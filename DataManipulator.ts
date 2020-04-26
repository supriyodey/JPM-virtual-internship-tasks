import { ServerRespond } from './DataStreamer';
 
export interface Row {
price_abc: number,
price_def: number,
ratio: number,
timestamp: Date,
upper_bound: number,
lower_bound: number,
trigger_alert: number | undefined,
}
 
 
export class DataManipulator {
//access serverRespond as an array where in the first
//element (0-index) is about stock ABC and the second element (1-index) is
//about stock DEF
static generateRow(serverRespond: ServerRespond[]): Row {
const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
const ratio = priceABC / priceDEF;
//maintain uB and lB as steady upper and lower lines in the graph
const upperBound = 1 + 0.05;
const lowerBound = 1 - 0.05;
return {
price_abc: priceABC,
price_def: priceDEF,
ratio,
timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
serverRespond[0].timestamp : serverRespond[1].timestamp,
upper_bound: upperBound,
lower_bound: lowerBound,
trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
};
}
}
