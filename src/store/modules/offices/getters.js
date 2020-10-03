import token from '@/services/TokenService'

export default {
    fact_invoice: state => {
        if (token.getOfficeId()) {
            let office = JSON.parse(token.getOfficeId());
            return state.offices[office.index].invoice_correlative
        }
        return state.offices[0].invoice_correlative
    },
    fact_credential: state => {
        if (token.getOfficeId()) {
            let office = JSON.parse(token.getOfficeId());
            return state.offices[office.index].fiscal_credit_correlative
        }
        return state.offices[0].fiscal_credit_correlative
    },
    office_id: state => {
        if (token.getOfficeId()) {
            let office = JSON.parse(token.getOfficeId());
            return office.id
        } else {
            token.setOfficeId(JSON.stringify(
                {
                    id: state.offices[0].id,
                    index: 0
                }
            ))
            let office = JSON.parse(token.getOfficeId());
            return office.id
        }
    }
}