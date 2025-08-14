import copBizagiSubscription from '../../model/apiCop/copBizagiSubscription.js';
import copCompany from '../../model/apiCop/copCompany.js';

async function createBizagiSubscription(req, res)
{
    try 
    {
      const { idCompany } = req.body;
      if (!idCompany) {
        return res.status(400).json({ error: 'El campo idCompany es requerido en la suscripción.' });
      }

      // Validar que la compañía exista
      const companyExists = await copCompany.findOne({ idCompany });
      if (!companyExists) {
        return res.status(404).json({ error: 'No existe la compañía con el idCompany proporcionado.' });
      }

      const subscription = new copBizagiSubscription(req.body);
      await subscription.save();
      res.status(200).json(subscription);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

async function getBizagiSubscriptions(req, res) {
  try {
    const subscriptions = await copBizagiSubscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export {
  createBizagiSubscription,
  getBizagiSubscriptions
};