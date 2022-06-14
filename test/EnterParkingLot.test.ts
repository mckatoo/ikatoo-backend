import EnterParkingLot from '../src/core/usecase/EnterParkingLot'
import GetParkingLot from '../src/core/usecase/GetParkingLot'
import ParkingLotRepository from '../src/infra/repository/ParkingLotRepositoryMemory'
// import ParkingLotRepository from '../src/infra/repository/ParkingLotRepositorySQL'
// import database from '../src/infra/database/database'
import sleep from './sleep'

describe('ParkingLot', () => {
  let parkingLotRepository: ParkingLotRepository

  beforeEach(() => {
    parkingLotRepository = new ParkingLotRepository()
    // database.none('truncate table parked_car')
  })

  test('Should get parking lot', async function () {
    const getParkingLot = new GetParkingLot(parkingLotRepository)
    const parkingLot = await getParkingLot.execute('shopping')
    expect(parkingLot.code).toBe('shopping')
  })

  test('Should enter parking lot', async function () {
    const enterParkingLot = new EnterParkingLot(parkingLotRepository)
    const getParkingLot = new GetParkingLot(parkingLotRepository)
    const parkingLotBeforeEnter = await getParkingLot.execute('shopping')
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0)
    await enterParkingLot.execute('shopping', 'MMM-0001', new Date('2021-03-01T10:00:00'))

    await sleep(500)
    const parkingLotAfterEnter = await getParkingLot.execute('shopping')
    expect(parkingLotAfterEnter.occupiedSpaces).toBe(1)
  })

  test('Should be closed', async function () {
    const enterParkingLot = new EnterParkingLot(parkingLotRepository)
    const getParkingLot = new GetParkingLot(parkingLotRepository)
    const parkingLotBeforeEnter = await getParkingLot.execute('shopping')
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0)
    await expect(
      enterParkingLot.execute('shopping', 'MMM-0001', new Date('2021-03-01T23:00:00'))
    ).rejects.toThrowError('The parking lot is closed')
  })

  test('Should be full', async function () {
    const enterParkingLot = new EnterParkingLot(parkingLotRepository)
    const getParkingLot = new GetParkingLot(parkingLotRepository)
    const parkingLotBeforeEnter = await getParkingLot.execute('shopping')
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0)
    await enterParkingLot.execute('shopping', 'MMM-0001', new Date('2021-03-01T10:00:00'))
    await enterParkingLot.execute('shopping', 'MMM-0002', new Date('2021-03-01T10:00:00'))
    await enterParkingLot.execute('shopping', 'MMM-0003', new Date('2021-03-01T10:00:00'))
    await enterParkingLot.execute('shopping', 'MMM-0004', new Date('2021-03-01T10:00:00'))
    await enterParkingLot.execute('shopping', 'MMM-0005', new Date('2021-03-01T10:00:00'))

    await sleep(500)
    await expect(
      enterParkingLot.execute('shopping', 'MMM-0006', new Date('2021-03-01T10:00:00'))
    ).rejects.toThrowError('The parking lot is full')
  })
})
