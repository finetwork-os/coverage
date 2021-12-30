import { rest } from 'msw'

export const handlers = [
  rest.get('/normalize', (req, res, ctx) => {
    const address = req.url.searchParams.get('address')
    switch (address) {
      case 'not_found':
        return res(
          ctx.status(404),
          ctx.json({
            timestamp: 1640855740901,
            status: 404,
            error: 'Not Found',
            message: 'No message available',
            path: '/coverage/normalize',
          })
        )
      case 'server_error':
        return res(
          ctx.status(500),
          ctx.json({
            timestamp: 1640855740901,
            status: 500,
            error: 'Server error',
            message: 'Server error',
            path: '/coverage/normalize',
          })
        )
      default:
        return res(
          ctx.json([
            {
              label:
                'Calle Conde De Peñalver, Madrid, Madrid, Comunidad de Madrid, España',
              number: '',
              type: 'CL',
              street: 'Conde De Peñalver',
              streetId: '910010099',
              town: 'Madrid',
              province: 'Madrid',
              cp: '28001',
              townId: '910000078',
              provinceId: '910000001',
            },
          ])
        )
    }
  }),
  rest.post('/locator', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          ThoroughfareType: 'CALLE',
          StreetId: '910010099',
          StreetName: 'CONDE DE PEÑALVER',
          TownName: 'MADRID',
          ProvinceName: 'MADRID',
          PostCode: '28006',
          IsSuggested: 'false',
          Horizontals: {
            Horizontal: {
              HorizontalId: '9110068602',
              StreetNumber: '30',
              Duplicate: {},
              Verticals: {
                Vertical: [],
              },
              block: {},
              hand2: {},
              blockName: {},
              blockNumber: {},
              blockRaw: {},
              fieldNumber: 'Nº 30',
              identifier: {},
              identifierName: {},
              identifierNumber: {},
              letter: {},
              fieldDoor: {},
              fieldFloor: {},
              fieldStair: {},
              hand1: {},
              hand1Raw: {},
              stairNumber: {},
              stairRaw: {},
            },
          },
          streettype: 'CL',
        },
      ])
    )
  }),
  rest.get('/visibility', (req, res, ctx) => {
    return res(ctx.json([{}]))
  }),
]
