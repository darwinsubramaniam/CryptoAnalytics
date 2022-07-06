import { Test, TestingModule } from '@nestjs/testing';
import { PolkadotService } from './polkadot.service';

describe('PolkadotService', () => {
  let service: PolkadotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PolkadotService],
    }).compile();

    service = module.get<PolkadotService>(PolkadotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
