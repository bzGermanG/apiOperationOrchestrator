import copBizagiProject from '../../model/apiCop/copBizagiProject.js';
import copBizagiSubscription from '../../model/apiCop/copBizagiSubscription.js';

async function createBizagiProject(req, res)
{
    try 
    {
      const { subscriptionId } = req.body;
      if (!subscriptionId) {
        return res.status(400).json({ error: 'El campo subscriptionId es requerido en el proyecto.' });
      }

      // Validar que la suscripción exista
      const subscriptionExists = await copBizagiSubscription.findOne({ id: subscriptionId });
      if (!subscriptionExists) {
        return res.status(404).json({ error: 'No existe la suscripción con el subscriptionId proporcionado.' });
      }

      const project = new copBizagiProject(req.body);
      await project.save();
      res.status(200).json(project);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

export {
  createBizagiProject
};