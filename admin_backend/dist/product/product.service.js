"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entinty_1 = require("./product.entinty");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async allProducts() {
        return await this.productRepository.find();
    }
    async getProductById(id) {
        try {
            return await this.productRepository.findOneOrFail({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            if (error.name === 'EntityNotFoundError') {
                throw new common_1.NotFoundException(`Product with id ${id} not found`);
            }
            throw error;
        }
    }
    async createProduct(product) {
        const { title, image } = product;
        const newProduct = this.productRepository.create({ title, image });
        await this.productRepository.save(newProduct);
        return newProduct;
    }
    async updateProduct(id, updateProductDto) {
        return this.productRepository.save(Object.assign(Object.assign({}, updateProductDto), { id: id }));
    }
    async deleteProductById(id) {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entinty_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map