

export class DefaultService {

  static async getBots(): Promise<{ message: string, isSuccess: boolean, data: any }> {

    return {
      message: "Success",
      isSuccess: true,
      data: {}
    }

  }
}
