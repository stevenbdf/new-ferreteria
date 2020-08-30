export default {
    fact_invoice: state => state.offices[0].invoice_correlative,
    fact_credential: state => state.offices[0].fiscal_credit_correlative,
    office_id: state => state.offices[0].id
}