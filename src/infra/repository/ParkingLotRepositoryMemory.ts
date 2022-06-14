import ParkingLotAdapter from '../../adapter/ParkingLotAdapter'
import ParkingLot from '../../core/entity/ParkingLot'
import ParkingLotRepository from '../../core/repository/ParkingLotRepository'

type ParkingLotProps = {
  code: string
  capacity: number
  open_hour: number
  close_hour: number
}

type ParkedCarProps = {
  code: string
  plate: string
  date: Date
}

export default class ParkingLotRepositoryMemory implements ParkingLotRepository {
  parkingLots: ParkingLotProps[] = [
    {
      code: 'shopping',
      capacity: 5,
      open_hour: 8,
      close_hour: 22
    }
  ]

  parkedCars: ParkedCarProps[] = []

  getParkingLot (code: string): Promise<ParkingLot> {
    const parkingLotData = this.parkingLots.find(parkingLot => parkingLot.code === code)
    const occupiedSpaces = this.parkedCars.length

    if (!parkingLotData) return Promise.reject(new Error('Parking lot not found'))

    const parkingLot = ParkingLotAdapter.create(parkingLotData.code, parkingLotData.capacity, parkingLotData.open_hour, parkingLotData.close_hour, occupiedSpaces)
    return Promise.resolve(parkingLot)
  }

  saveParkedCar (code: string, plate: string, date: Date): void {
    this.parkedCars.push({ code, plate, date })
  }
}
