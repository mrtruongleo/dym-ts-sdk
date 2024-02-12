import { MsgBase } from "../../MsgBase";
import snakecaseKeys from "snakecase-keys";
import { CosmosBaseV1Beta1Coin, InjectiveAuctionV1Beta1Tx, } from "@injectivelabs/core-proto-ts";
/**
 * @category Messages
 */
export default class MsgBid extends MsgBase {
    static fromJSON(params) {
        return new MsgBid(params);
    }
    toProto() {
        const { params } = this;
        const amountCoin = CosmosBaseV1Beta1Coin.Coin.create();
        amountCoin.amount = params.amount.amount;
        amountCoin.denom = params.amount.denom;
        const message = InjectiveAuctionV1Beta1Tx.MsgBid.create();
        message.sender = params.injectiveAddress;
        message.round = params.round.toString();
        message.bidAmount = amountCoin;
        return InjectiveAuctionV1Beta1Tx.MsgBid.fromPartial(message);
    }
    toData() {
        const proto = this.toProto();
        return {
            "@type": "/injective.auction.v1beta1.MsgBid",
            ...proto,
        };
    }
    toAmino() {
        const proto = this.toProto();
        const message = {
            ...snakecaseKeys(proto),
        };
        return {
            type: "auction/MsgBid",
            value: message,
        };
    }
    toDirectSign() {
        const proto = this.toProto();
        return {
            type: "/injective.auction.v1beta1.MsgBid",
            message: proto,
        };
    }
    toWeb3() {
        const amino = this.toAmino();
        const { value } = amino;
        return {
            "@type": "/injective.auction.v1beta1.MsgBid",
            ...value,
        };
    }
    toBinary() {
        return InjectiveAuctionV1Beta1Tx.MsgBid.encode(this.toProto()).finish();
    }
}
