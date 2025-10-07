import { http, HttpResponse } from 'msw';
import adaptereData from '../fixtures/adaptere.json';
import adapterDetailData from '../fixtures/adapter-detail.json';
import adapterComponentDetailData from '../fixtures/adapter-component-detail.json';
import adapterComponentModalData from '../fixtures/adapter-component-modal.json';
import hendelserData from '../fixtures/hendelser.json';
import hendelseDetailData from '../fixtures/hendelse-detail.json';

export const handlers = [
  // Adaptere API
  http.get('http://localhost:8080/api/adapters', () => {
    return HttpResponse.json(adaptereData);
  }),

  // Adapter detail API
  http.get('http://localhost:8080/api/adaptere/:adapterId', ({ params }) => {
    const { adapterId: _adapterId } = params;
    return HttpResponse.json(adapterDetailData);
  }),

  // Adapter component detail API
  http.get('http://localhost:8080/api/adaptere/:adapterId/:componentId', ({ params }) => {
    const { adapterId: _adapterId, componentId: _componentId } = params;
    return HttpResponse.json(adapterComponentDetailData);
  }),

  // Adapter component modal data API
  http.get('http://localhost:8080/api/adaptere/:adapterId/:componentId/:adapterName', ({ params }) => {
    const { adapterId: _adapterId, componentId: _componentId, adapterName: _adapterName } = params;
    return HttpResponse.json(adapterComponentModalData);
  }),

  // Hendelser API
  http.get('http://localhost:8080/api/hendelser', () => {
    return HttpResponse.json(hendelserData);
  }),

  // Hendelse detail API (for modal)
  http.get('http://localhost:8080/api/hendelser/:hendelseId', ({ params }) => {
    const { hendelseId: _hendelseId } = params;
    return HttpResponse.json(hendelseDetailData);
  }),

  // Hendelse detail API (new endpoint)
  http.get('http://localhost:8080/api/hendelser/:hendelseId/detail', ({ params }) => {
    const { hendelseId: _hendelseId } = params;
    return HttpResponse.json(hendelseDetailData);
  })
];
