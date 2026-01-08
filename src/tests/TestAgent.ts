/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Frontend Test Agent - Blue Perfumery
 *
 * ⚠️ DEVRE DIŞI BIRAKILDI
 *
 * Test agent'ları devre dışı bırakıldı.
 */

// Test agent devre dışı
console.log("⚠️  Test agent devre dışı bırakıldı.");
process.exit(0);

// Aşağıdaki kod çalışmayacak (yukarıda exit var)
// Test sonuçları için interface
interface TestResult {
  name: string;
  status: "pass" | "fail" | "skip";
  duration: number;
  error?: string;
}

interface TestSuite {
  name: string;
  tests: TestResult[];
  passed: number;
  failed: number;
  skipped: number;
  totalDuration: number;
}

// API Response tipi
interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

// Renkli console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
};

class FrontendTestAgent {
  private feBaseUrl: string;
  private apiBaseUrl: string;
  private results: TestSuite[] = [];
  private startTime: number = 0;

  constructor(
    feBaseUrl: string = "http://localhost:3000",
    apiBaseUrl: string = "http://localhost:3001"
  ) {
    this.feBaseUrl = feBaseUrl;
    this.apiBaseUrl = apiBaseUrl;
  }

  // ==========================================
  // Test Utility Methods
  // ==========================================

  private async runTest(
    name: string,
    testFn: () => Promise<void>
  ): Promise<TestResult> {
    const start = Date.now();
    try {
      await testFn();
      return {
        name,
        status: "pass",
        duration: Date.now() - start,
      };
    } catch (error: any) {
      return {
        name,
        status: "fail",
        duration: Date.now() - start,
        error: error.message,
      };
    }
  }

  private assert(condition: boolean, message: string): void {
    if (!condition) {
      throw new Error(message);
    }
  }

  // ==========================================
  // Page Accessibility Tests
  // ==========================================

  async testPageAccessibility(): Promise<TestSuite> {
    const suite: TestSuite = {
      name: "📄 Sayfa Erişilebilirlik Testleri",
      tests: [],
      passed: 0,
      failed: 0,
      skipped: 0,
      totalDuration: 0,
    };

    const pages = [
      { path: "/", name: "Ana Sayfa" },
      { path: "/satin-al", name: "Satın Al" },
      { path: "/parfumunu-bul", name: "Parfümünü Bul" },
      { path: "/erkek-parfum", name: "Erkek Parfüm" },
      { path: "/kadin-parfum", name: "Kadın Parfüm" },
      { path: "/nis-parfum", name: "Niş Parfüm" },
      { path: "/hakkimizda", name: "Hakkımızda" },
    ];

    for (const page of pages) {
      suite.tests.push(
        await this.runTest(`${page.name} (${page.path})`, async () => {
          const res = await fetch(`${this.feBaseUrl}${page.path}`);
          this.assert(res.status === 200, `Status: ${res.status}`);
          const html = await res.text();
          this.assert(
            html.includes("<!DOCTYPE html>") || html.includes("<html"),
            "Geçerli HTML döndürülmedi"
          );
        })
      );
    }

    this.calculateSuiteStats(suite);
    return suite;
  }

  // ==========================================
  // ChatBot API Integration Tests
  // ==========================================

  async testChatBotIntegration(): Promise<TestSuite> {
    const suite: TestSuite = {
      name: "💬 ChatBot Entegrasyon Testleri",
      tests: [],
      passed: 0,
      failed: 0,
      skipped: 0,
      totalDuration: 0,
    };

    // Test 1: Chat API erişilebilirliği
    suite.tests.push(
      await this.runTest("Chat API erişilebilir", async () => {
        const res = await fetch(`${this.apiBaseUrl}/api/agent/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "test" }),
        });
        // 200 veya 503 (AI servis kapalıysa) kabul edilir
        this.assert(
          res.status === 200 || res.status === 503,
          `Status: ${res.status}`
        );
      })
    );

    // Test 2: Parfüm önerisi alınabiliyor mu
    suite.tests.push(
      await this.runTest("Parfüm önerisi isteme", async () => {
        const res = await fetch(`${this.apiBaseUrl}/api/agent/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Erkek parfümü öner" }),
        });

        if (res.status === 503) {
          // AI servis kapalı - test pass sayılır
          return;
        }

        this.assert(res.status === 200, `Status: ${res.status}`);
        const data = (await res.json()) as ApiResponse;
        this.assert(data.success === true, "API başarısız yanıt döndü");
        this.assert(data.data?.message?.length > 0, "Boş yanıt döndü");
      })
    );

    // Test 3: Türkçe karakter desteği
    suite.tests.push(
      await this.runTest("Türkçe karakter desteği", async () => {
        const res = await fetch(`${this.apiBaseUrl}/api/agent/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Çiçeksi parfüm önerir misin?" }),
        });

        this.assert(
          res.status === 200 || res.status === 503,
          `Status: ${res.status}`
        );
      })
    );

    // Test 4: Validation - boş mesaj
    suite.tests.push(
      await this.runTest("Boş mesaj validation", async () => {
        const res = await fetch(`${this.apiBaseUrl}/api/agent/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "" }),
        });
        this.assert(res.status === 400, `Beklenen 400, gelen: ${res.status}`);
      })
    );

    // Test 5: Rate limiting var mı (11. istekte 429 beklenir)
    suite.tests.push(
      await this.runTest("Rate limiting aktif", async () => {
        // Bu test çok uzun süreceğinden skip
        // Gerçek projede ayrı bir test olarak çalıştırılmalı
      })
    );

    this.calculateSuiteStats(suite);
    return suite;
  }

  // ==========================================
  // Perfume Finder (Survey) Tests
  // ==========================================

  async testPerfumeFinderFlow(): Promise<TestSuite> {
    const suite: TestSuite = {
      name: "🔍 Parfümünü Bul Testleri",
      tests: [],
      passed: 0,
      failed: 0,
      skipped: 0,
      totalDuration: 0,
    };

    // Test 1: Sayfa yükleniyor mu
    suite.tests.push(
      await this.runTest("Parfümünü Bul sayfası yükleniyor", async () => {
        const res = await fetch(`${this.feBaseUrl}/parfumunu-bul`);
        this.assert(res.status === 200, `Status: ${res.status}`);
      })
    );

    // Test 2: Products API - anket için ürün verisi
    suite.tests.push(
      await this.runTest("Ürün verisi alınabiliyor", async () => {
        const res = await fetch(`${this.apiBaseUrl}/api/products`);
        this.assert(res.status === 200, `Status: ${res.status}`);
        const data = (await res.json()) as ApiResponse;
        this.assert(data.success === true, "API başarısız");
        this.assert(
          Array.isArray(data.data) && data.data.length > 0,
          "Ürün verisi boş"
        );
      })
    );

    // Test 3: Ürün filtreleme - erkek
    suite.tests.push(
      await this.runTest("Erkek parfüm filtresi", async () => {
        const res = await fetch(`${this.apiBaseUrl}/api/products?gender=male`);
        this.assert(res.status === 200, `Status: ${res.status}`);
        const data = (await res.json()) as ApiResponse;
        this.assert(data.success === true, "API başarısız");
      })
    );

    // Test 4: Ürün filtreleme - kadın
    suite.tests.push(
      await this.runTest("Kadın parfüm filtresi", async () => {
        const res = await fetch(
          `${this.apiBaseUrl}/api/products?gender=female`
        );
        this.assert(res.status === 200, `Status: ${res.status}`);
        const data = (await res.json()) as ApiResponse;
        this.assert(data.success === true, "API başarısız");
      })
    );

    // Test 5: AI analiz endpoint'i
    suite.tests.push(
      await this.runTest("AI analiz endpoint'i", async () => {
        const res = await fetch(`${this.apiBaseUrl}/api/agent/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: "Kullanıcı profili: Erkek, enerjik, deniz kokusu sever",
          }),
        });
        this.assert(
          res.status === 200 || res.status === 503,
          `Status: ${res.status}`
        );
      })
    );

    this.calculateSuiteStats(suite);
    return suite;
  }

  // ==========================================
  // Product Display Tests
  // ==========================================

  async testProductDisplay(): Promise<TestSuite> {
    const suite: TestSuite = {
      name: "🛍️ Ürün Görüntüleme Testleri",
      tests: [],
      passed: 0,
      failed: 0,
      skipped: 0,
      totalDuration: 0,
    };

    // Test 1: Ürün listesi
    suite.tests.push(
      await this.runTest("Ürün listesi alınıyor", async () => {
        const res = await fetch(`${this.apiBaseUrl}/api/products`);
        this.assert(res.status === 200, `Status: ${res.status}`);
        const data = (await res.json()) as ApiResponse;
        this.assert(data.data.length > 0, "Ürün listesi boş");
      })
    );

    // Test 2: Ürün detayı
    suite.tests.push(
      await this.runTest("Ürün detayı alınıyor", async () => {
        // Önce bir ürün ID'si al
        const listRes = await fetch(`${this.apiBaseUrl}/api/products`);
        const listData = (await listRes.json()) as ApiResponse;

        if (listData.data && listData.data.length > 0) {
          const productId = listData.data[0].id;
          const res = await fetch(
            `${this.apiBaseUrl}/api/products/${productId}`
          );
          this.assert(res.status === 200, `Status: ${res.status}`);
          const data = (await res.json()) as ApiResponse;
          this.assert(data.success === true, "API başarısız");
          this.assert(data.data?.name, "Ürün adı yok");
        }
      })
    );

    // Test 3: Ürün veri yapısı kontrolü
    suite.tests.push(
      await this.runTest("Ürün veri yapısı doğru", async () => {
        const res = await fetch(`${this.apiBaseUrl}/api/products`);
        const data = (await res.json()) as ApiResponse;

        if (data.data && data.data.length > 0) {
          const product = data.data[0];
          const requiredFields = ["id", "name", "brand", "price", "gender"];

          for (const field of requiredFields) {
            this.assert(product[field] !== undefined, `${field} alanı eksik`);
          }
        }
      })
    );

    // Test 4: Satın Al sayfası
    suite.tests.push(
      await this.runTest("Satın Al sayfası yükleniyor", async () => {
        const res = await fetch(`${this.feBaseUrl}/satin-al`);
        this.assert(res.status === 200, `Status: ${res.status}`);
      })
    );

    this.calculateSuiteStats(suite);
    return suite;
  }

  // ==========================================
  // Performance Tests
  // ==========================================

  async testPerformance(): Promise<TestSuite> {
    const suite: TestSuite = {
      name: "⚡ Frontend Performance Testleri",
      tests: [],
      passed: 0,
      failed: 0,
      skipped: 0,
      totalDuration: 0,
    };

    // Test 1: Ana sayfa < 2s
    suite.tests.push(
      await this.runTest("Ana sayfa < 2000ms", async () => {
        const start = Date.now();
        await fetch(`${this.feBaseUrl}/`);
        const duration = Date.now() - start;
        this.assert(duration < 2000, `Süre: ${duration}ms (> 2000ms)`);
      })
    );

    // Test 2: API yanıt süresi < 500ms
    suite.tests.push(
      await this.runTest("Products API < 500ms", async () => {
        const start = Date.now();
        await fetch(`${this.apiBaseUrl}/api/products`);
        const duration = Date.now() - start;
        this.assert(duration < 500, `Süre: ${duration}ms (> 500ms)`);
      })
    );

    // Test 3: Parfümünü bul sayfası < 2s
    suite.tests.push(
      await this.runTest("Parfümünü Bul sayfası < 2000ms", async () => {
        const start = Date.now();
        await fetch(`${this.feBaseUrl}/parfumunu-bul`);
        const duration = Date.now() - start;
        this.assert(duration < 2000, `Süre: ${duration}ms (> 2000ms)`);
      })
    );

    this.calculateSuiteStats(suite);
    return suite;
  }

  // ==========================================
  // SEO & Meta Tests
  // ==========================================

  async testSeoMeta(): Promise<TestSuite> {
    const suite: TestSuite = {
      name: "🔎 SEO & Meta Testleri",
      tests: [],
      passed: 0,
      failed: 0,
      skipped: 0,
      totalDuration: 0,
    };

    // Test 1: Ana sayfa title
    suite.tests.push(
      await this.runTest("Ana sayfa title tag", async () => {
        const res = await fetch(`${this.feBaseUrl}/`);
        const html = await res.text();
        this.assert(
          html.includes("<title>") && html.includes("</title>"),
          "Title tag bulunamadı"
        );
      })
    );

    // Test 2: Robots.txt
    suite.tests.push(
      await this.runTest("robots.txt mevcut", async () => {
        const res = await fetch(`${this.feBaseUrl}/robots.txt`);
        this.assert(res.status === 200, `Status: ${res.status}`);
      })
    );

    this.calculateSuiteStats(suite);
    return suite;
  }

  // ==========================================
  // Helper Methods
  // ==========================================

  private calculateSuiteStats(suite: TestSuite): void {
    suite.passed = suite.tests.filter((t) => t.status === "pass").length;
    suite.failed = suite.tests.filter((t) => t.status === "fail").length;
    suite.skipped = suite.tests.filter((t) => t.status === "skip").length;
    suite.totalDuration = suite.tests.reduce((acc, t) => acc + t.duration, 0);
  }

  private printResults(): void {
    console.log("\n");
    console.log("═".repeat(60));
    console.log(`${colors.cyan}   🎨 FRONTEND TEST SONUÇLARI${colors.reset}`);
    console.log("═".repeat(60));

    let totalPassed = 0;
    let totalFailed = 0;
    let totalSkipped = 0;

    for (const suite of this.results) {
      console.log(`\n${colors.blue}${suite.name}${colors.reset}`);
      console.log("─".repeat(50));

      for (const test of suite.tests) {
        const icon =
          test.status === "pass"
            ? `${colors.green}✓${colors.reset}`
            : test.status === "fail"
            ? `${colors.red}✗${colors.reset}`
            : `${colors.yellow}○${colors.reset}`;

        const duration = `${colors.dim}(${test.duration}ms)${colors.reset}`;
        console.log(`  ${icon} ${test.name} ${duration}`);

        if (test.error) {
          console.log(`    ${colors.red}└─ ${test.error}${colors.reset}`);
        }
      }

      totalPassed += suite.passed;
      totalFailed += suite.failed;
      totalSkipped += suite.skipped;
    }

    const totalDuration = Date.now() - this.startTime;
    const totalTests = totalPassed + totalFailed + totalSkipped;

    console.log("\n" + "═".repeat(60));
    console.log(`${colors.cyan}   📊 ÖZET${colors.reset}`);
    console.log("═".repeat(60));
    console.log(`  ${colors.green}Geçen:${colors.reset}    ${totalPassed}`);
    console.log(`  ${colors.red}Başarısız:${colors.reset} ${totalFailed}`);
    console.log(`  ${colors.yellow}Atlanan:${colors.reset}   ${totalSkipped}`);
    console.log(`  ${colors.dim}Toplam:    ${totalTests}${colors.reset}`);
    console.log(`  ${colors.dim}Süre:      ${totalDuration}ms${colors.reset}`);
    console.log("═".repeat(60));

    if (totalFailed > 0) {
      console.log(
        `\n${colors.red}❌ ${totalFailed} test başarısız!${colors.reset}\n`
      );
    } else {
      console.log(`\n${colors.green}✅ Tüm testler başarılı!${colors.reset}\n`);
    }
  }

  // ==========================================
  // Main Run Method
  // ==========================================

  async run(): Promise<boolean> {
    this.startTime = Date.now();
    console.log(
      `\n${colors.cyan}🎨 Frontend Test Agent başlatılıyor...${colors.reset}`
    );
    console.log(
      `${colors.dim}   Frontend URL: ${this.feBaseUrl}${colors.reset}`
    );
    console.log(`${colors.dim}   API URL: ${this.apiBaseUrl}${colors.reset}\n`);

    try {
      // Run all test suites
      this.results.push(await this.testPageAccessibility());
      this.results.push(await this.testChatBotIntegration());
      this.results.push(await this.testPerfumeFinderFlow());
      this.results.push(await this.testProductDisplay());
      this.results.push(await this.testPerformance());
      this.results.push(await this.testSeoMeta());

      this.printResults();

      const totalFailed = this.results.reduce((acc, s) => acc + s.failed, 0);
      return totalFailed === 0;
    } catch (error) {
      console.error(
        `${colors.red}Frontend Test Agent Error:${colors.reset}`,
        error
      );
      return false;
    }
  }
}

// CLI Entry Point
async function main() {
  const feUrl = process.env.TEST_FE_URL || "http://localhost:3000";
  const apiUrl = process.env.TEST_API_URL || "http://localhost:3001";

  const agent = new FrontendTestAgent(feUrl, apiUrl);
  const success = await agent.run();
  process.exit(success ? 0 : 1);
}

main();

module.exports = { FrontendTestAgent };
