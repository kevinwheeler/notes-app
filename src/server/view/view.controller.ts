import {
  Controller,
  Get,
  Res,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { parse } from 'url';
import { JwtAuthGuard } from '../app/auth/jwt/jwt-auth.guard';

import { ViewService } from './view.service';
import { RedirectIfJwtAuthenticatedInterceptor } from '../app/auth/interceptors/redirect-if-jwt-authenticated';

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  async handler(req: Request, res: Response) {
    const parsedUrl = parse(req.url, true);
    await this.viewService
      .getNextServer()
      .render(req, res, parsedUrl.pathname, parsedUrl.query);
  }

  @UseInterceptors(new RedirectIfJwtAuthenticatedInterceptor('/notes'))
  @Get('/')
  public async showHome(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    const serverSideProps = {}; // leaving this as an example despite being empty

    await this.viewService.getNextServer().render(
      req,
      res,
      //parsedUrl.pathname,
      '/home',
      Object.assign(parsedUrl.query, serverSideProps),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async showProfile(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('notes')
  public async indexNotes(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @Get('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    await this.viewService
      .getNextServer()
      .render(req, res, parsedUrl.pathname, parsedUrl.query);
  }
}
