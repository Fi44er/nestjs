import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { watchlistDTO } from './dto';
import { jwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('watchlist')
export class WatchlistController {
    constructor(private readonly watchlistService: WatchlistService) {}

    @UseGuards(jwtAuthGuard)
    @Post('create')
    createAsset(@Body() assetDto: watchlistDTO, @Req() request) {
        const user = request.user
        return this.watchlistService.createAsset(user, assetDto)
    }

    @Get('get-all')
    getAllAssets() {
        return
    }

    @Patch('update')
    updateAsset() {
        return
    }

    @Delete()
    deleteAsset(@Query('id') id: string) {
        return
    }
}
