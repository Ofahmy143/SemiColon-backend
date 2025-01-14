import { Request, Response } from "express";
import {
  dbGetAllLogs,
  dbGetLogsByAdminId,
  dbGetLogsByParticipantId,
} from "../models/log/log.model";
import ErrorWithStatusCode from "../utils/classes/ErrorWithStatusCode";

export async function getAllLogs(req: Request, res: Response) {
  /**
   * #swagger.tags = ['Log']
   * #swagger.description = 'Endpoint to get all logs by all admins'
   */
  try {
    const allLogs = await dbGetAllLogs();
    res.status(200).json({
      status: "success",
      data: allLogs,
    });
  } catch (error: unknown) {
    res.status((error as ErrorWithStatusCode).statusCode || 500).json({
      status: "failure",
      message: (error as Error).message,
    });
  }
}

export async function getLogsByAdminId(req: Request, res: Response) {
  try {
    const adminId = req.params.id;
    const logs = await dbGetLogsByAdminId(adminId);
    res.status(200).json({
      status: "success",
      data: logs,
    });
  } catch (error: unknown) {
    res.status((error as ErrorWithStatusCode).statusCode || 500).json({
      status: "failure",
      message: (error as Error).message,
    });
  }
}

export async function getLogsByParticipantId(req: Request, res: Response) {
  /**
   * #swagger.tags = ['Log']
   * #swagger.description = 'Endpoint to get all logs applied on a participant'
   */
  try {
    const participantId = req.params.id;
    const logs = await dbGetLogsByParticipantId(participantId);
    res.status(200).json({
      status: "success",
      data: logs,
    });
  } catch (error: unknown) {
    res.status((error as ErrorWithStatusCode).statusCode || 500).json({
      status: "failure",
      message: (error as Error).message,
    });
  }
}

export async function getLogsByAdminPhone(req: Request, res: Response) {
  /**
   * #swagger.tags = ['Log']
   * #swagger.description = 'Endpoint to get all logs by an admin using their phone'
   */
  try {
    const adminPhone = req.params.phone;
    const logs = await dbGetLogsByAdminId(adminPhone);
    res.status(200).json({
      status: "success",
      data: logs,
    });
  } catch (error: unknown) {
    res.status((error as ErrorWithStatusCode).statusCode || 500).json({
      status: "failure",
      message: (error as Error).message,
    });
  }
}
