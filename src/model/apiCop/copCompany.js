import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


const sharedInfrastructureServicesSchema = new Schema({
  elasticServerName: { type: String },
  elasticServerUser: { type: String },
  elasticServerPassword: { type: String },
  elasticServerFQDN: { type: String },
  elasticServerResourceGroup: { type: String },
  elasticServerLocation: { type: String },
  elasticServerPoolName: { type: String },
  azureSubscriptionId: { type: String },
  azureSubscriptionClientId: { type: String },
  azureSubscriptionSecret: { type: String },
  azureSubscriptionTenantId: { type: String }
}, { _id: false });

const azureSubscriptionsSchema = new Schema({
  idAzureSubscription: { type: String, required: true },
  azureObjectId: { type: String, required: true },
  azureTenantId: { type: String, required: true },
  azureClientId: { type: String, required: true },
  azureSecretId: { type: String, required: true },
  azureSubscriptionType: { type: Number, required: true }
}, { _id: false });

const copCompanySchema = new Schema({
  idCompany: { 
    type: String, 
    required: true, 
    unique: true,
    default: () => uuidv4()
  },
  id: { 
    type: String, 
    required: true, 
    unique: true,
    default: () => uuidv4()
  },
  displayName: { 
    type: String, 
    required: true,
    unique: true,
  },
  azureSubscriptions: { 
    type: azureSubscriptionsSchema, 
    required: true 
  },
  realTier: { 
    type: String, 
    required: true, 
    ref: 'copTier' 
  },
  hasSharedInfrastructure: { 
    type: Boolean, 
    required: true 
  },
  sharedInfrastructureServices: {
    type: sharedInfrastructureServicesSchema,
    required: function() { return this.hasSharedInfrastructure; }
  }
}, {
  timestamps: true,
  collection: 'API_COP_COMPANY' // Especificamos el nombre de la colección
});

export default mongoose.model('copCompany', copCompanySchema); 